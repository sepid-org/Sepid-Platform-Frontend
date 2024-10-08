import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Canvas } from './components/Canvas';
import { createMasses, centerCameraOnAllMasses, isPointInMass, zoomToMass, GRID_SIZE } from './utils/gridUtils';
import { Camera, DragState, MovingItem, CategoryMass, ChatMessage } from './types';
import { categories } from './data/categories';
import { INITIAL_CAMERA_X, INITIAL_CAMERA_Y, INITIAL_CAMERA_ZOOM, MAX_ZOOM, MIN_ZOOM, ZOOM_SPEED, ZOOM_THRESHOLD } from './data/constants';
import { Box, TextField, Button, List, ListItem, ListItemText, Typography, Fab, Slide } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import Chatbot from './components/ChatBot';



const App: React.FC = () => {
  const [masses, setMasses] = useState<CategoryMass[]>([]);
  const [camera, setCamera] = useState<Camera>({ x: INITIAL_CAMERA_X, y: INITIAL_CAMERA_Y, zoom: INITIAL_CAMERA_ZOOM });
  const [dragState, setDragState] = useState<DragState>({ isDragging: false, isMovingItem: false, lastMouseX: 0, lastMouseY: 0 });
  const [movingItem, setMovingItem] = useState<MovingItem>({ key: null, offsetX: 0, offsetY: 0 });
  const [isChatOpen, setIsChatOpen] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const newMasses = createMasses(categories);
    setMasses(newMasses);
    const newCamera = centerCameraOnAllMasses(newMasses, window.innerWidth, window.innerHeight);
    setCamera({
      ...newCamera,
      x: newCamera.x - 120
    });
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const { zoom, x: cameraX, y: cameraY } = camera;
    const mouseX = e.clientX / zoom + cameraX;
    const mouseY = e.clientY / zoom + cameraY;

    if (zoom < ZOOM_THRESHOLD) {
      const clickedMass = masses.find(categoryMass => isPointInMass(mouseX, mouseY, categoryMass.mass));
      if (clickedMass) {
        setCamera(zoomToMass(clickedMass.mass, window.innerWidth, window.innerHeight));
      }
    } else {
      const gridX = Math.floor(mouseX / GRID_SIZE);
      const gridY = Math.floor(mouseY / GRID_SIZE);
      const key = `${gridX},${gridY}`;
      const clickedItem = masses.some(categoryMass =>
        categoryMass.mass.some(item => item.x === gridX && item.y === gridY)
      );

      setDragState(prev => ({
        ...prev,
        isDragging: !clickedItem,
        isMovingItem: clickedItem,
        lastMouseX: e.clientX,
        lastMouseY: e.clientY
      }));

      if (clickedItem) {
        setMovingItem({
          key,
          offsetX: mouseX % GRID_SIZE,
          offsetY: mouseY % GRID_SIZE
        });
      }
    }
  }, [camera, masses]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const { isDragging, isMovingItem, lastMouseX, lastMouseY } = dragState;
    const dx = e.clientX - lastMouseX;
    const dy = e.clientY - lastMouseY;

    if (isDragging) {
      setCamera(prev => ({ ...prev, x: prev.x - dx / prev.zoom, y: prev.y - dy / prev.zoom }));
    } else if (isMovingItem) {
      setMovingItem(prev => ({
        ...prev,
        offsetX: prev.offsetX + dx / camera.zoom,
        offsetY: prev.offsetY + dy / camera.zoom
      }));
    }

    setDragState(prev => ({ ...prev, lastMouseX: e.clientX, lastMouseY: e.clientY }));
  }, [dragState, camera.zoom]);

  const handleMouseUp = useCallback(() => {
    if (dragState.isMovingItem && movingItem.key) {
      const [oldX, oldY] = movingItem.key.split(',').map(Number);
      const newX = Math.floor((oldX * GRID_SIZE + movingItem.offsetX) / GRID_SIZE);
      const newY = Math.floor((oldY * GRID_SIZE + movingItem.offsetY) / GRID_SIZE);
      const newKey = `${newX},${newY}`;

      if (newKey !== movingItem.key) {
        setMasses(prevMasses => prevMasses.map(categoryMass => ({
          ...categoryMass,
          mass: categoryMass.mass.map(item =>
            (item.x === oldX && item.y === oldY)
              ? { ...item, x: newX, y: newY }
              : item
          )
        })));
      }
    }

    setDragState(prev => ({ ...prev, isDragging: false, isMovingItem: false }));
    setMovingItem({ key: null, offsetX: 0, offsetY: 0 });
  }, [dragState.isMovingItem, movingItem]);

  const handleWheel = useCallback((e: React.WheelEvent<HTMLCanvasElement>) => {
    const zoomPoint = {
      x: e.clientX / camera.zoom + camera.x,
      y: e.clientY / camera.zoom + camera.y
    };

    const newZoom = Math.max(MIN_ZOOM, Math.min(
      e.deltaY < 0 ? camera.zoom * (1 + ZOOM_SPEED) : camera.zoom / (1 + ZOOM_SPEED),
      MAX_ZOOM
    ));

    setCamera(prev => ({
      zoom: newZoom,
      x: zoomPoint.x - e.clientX / newZoom,
      y: zoomPoint.y - e.clientY / newZoom
    }));
  }, [camera]);

  const toggleChat = () => {
    setIsChatOpen(prev => !prev);
  };

  return (
    <Box sx={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <Canvas
        ref={canvasRef}
        masses={masses}
        camera={camera}
        movingItem={movingItem}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel}
      />
      <Fab
        color="primary"
        aria-label="toggle chat"
        onClick={toggleChat}
        sx={{
          position: 'absolute',
          bottom: 16,
          right: isChatOpen ? 316 : 16,
          transition: 'right 0.3s ease-in-out',
        }}
      >
        {isChatOpen ? <CloseIcon /> : <ChatIcon />}
      </Fab>
      <Chatbot isOpen={isChatOpen} />
    </Box>
  );
};

export default App;