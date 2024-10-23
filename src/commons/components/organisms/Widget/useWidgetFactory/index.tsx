import WIDGET_TYPE_MAPPER from './WidgetTypeMapper';
import {
  useCreateWidgetMutation,
  useDeleteWidgetMutation,
  useUpdateWidgetMutation,
} from 'apps/website-display/redux/features/widget/WidgetSlice';
import { useFSMStateContext } from 'commons/hooks/useFSMStateContext';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

type WidgetFactoryType = {
  widgetId?: string;
  paperId?: string;
  widgetType?: string;
  collectAnswer?: any;
}

const useWidgetFactory = ({
  widgetId,
  paperId,
  widgetType,
  collectAnswer,
}: WidgetFactoryType) => {
  const { playerId } = useFSMStateContext();
  const [deleteWidget] = useDeleteWidgetMutation();
  const [createWidget] = useCreateWidgetMutation();
  const [updateWidget] = useUpdateWidgetMutation();

  let onDelete, onMutate, onAnswerChange, onQuery, onAnswerSubmit;

  const {
    WidgetComponent,
    EditWidgetDialog,
    useSubmitAnswerMutation,
  } = WIDGET_TYPE_MAPPER[widgetType];

  const submitAnswerToolkit = useSubmitAnswerMutation?.();
  const submitAnswer = submitAnswerToolkit?.[0];
  const submitAnswerResult = submitAnswerToolkit?.[1];

  onMutate =
    widgetId ?
      (props) => {
        updateWidget({ widgetId, widgetType, paperId, playerId, ...props });
      } :
      (props) => {
        createWidget({ widgetType, paperId, playerId, ...props });
      }

  onAnswerChange = collectAnswer ? collectAnswer : () => { };

  onAnswerSubmit = (props) => {
    submitAnswer({
      ...props,
      playerId,
    });
  }

  onDelete = (props) => deleteWidget(props);

  return {
    onDelete,
    onMutate,
    onAnswerChange,
    onQuery,
    onAnswerSubmit,
    submitAnswerResult,
    WidgetComponent,
    EditWidgetDialog,
  };
}

export default useWidgetFactory;