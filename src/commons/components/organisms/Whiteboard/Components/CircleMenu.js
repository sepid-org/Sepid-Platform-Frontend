import { IconButton } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import {
  FiberManualRecord as FiberManualRecordIcon,
  FiberManualRecordOutlined as FiberManualRecordOutlinedIcon
} from '@mui/icons-material'
import {
  bindHover,
  bindMenu,
  usePopupState
} from 'material-ui-popup-state/hooks'
import Menu from 'material-ui-popup-state/HoverMenu'
import React from 'react'
import { connect } from 'react-redux'

import {
  addNewCircleNodeAction,
  changeWhiteboardModeAction
} from 'apps/website-display/redux/slices/whiteboard'
import DrawingModes from '../Drawing/DrawingModes'
import { useFSMStateContext } from 'commons/hooks/useFSMStateContext'

const CircleMenu = ({ changeMode, addNewCircleNode }) => {
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'circleMenu'
  })
  const { teamId } = useFSMStateContext();

  const onClick = (type) => {
    changeMode({ mode: DrawingModes.MOVE })
    addNewCircleNode({ uuid: teamId, type })
    popupState.close()
  }

  return (
    <React.Fragment>
      <IconButton variant="contained" {...bindHover(popupState)} size="large">
        <FiberManualRecordOutlinedIcon />
      </IconButton>
      <Menu disableScrollLock
        {...bindMenu(popupState)}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <MenuItem onClick={() => { onClick('outlined') }}>
          <FiberManualRecordOutlinedIcon />
        </MenuItem>
        <MenuItem onClick={() => { onClick('normal') }}>
          <FiberManualRecordIcon />
        </MenuItem>
      </Menu>
    </React.Fragment>
  )
}

export default connect(null, {
  changeMode: changeWhiteboardModeAction,
  addNewCircleNode: addNewCircleNodeAction
})(CircleMenu)
