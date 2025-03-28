import React, { FC } from 'react';
import { ChoiceType, ChoiceVariantType } from 'commons/types/widgets';
import { WidgetModes } from 'commons/components/organisms/Widget';
import ChoiceEdit from './ChoiceEdit';
import ChoiceView from './ChoiceView';

export type ChoicePropsType = {
  choice: ChoiceType;
  isSelected: boolean;
  onSelectionChange: any;
  onDelete: any;
  onTextChange: any;
  variant: ChoiceVariantType;
  mode: WidgetModes;
  inactive: boolean;
}

const Choice: FC<Partial<ChoicePropsType>> = ({
  choice,
  isSelected,
  onSelectionChange,
  onDelete,
  onTextChange,
  variant,
  mode,
  inactive,
}) => {

  if (mode === WidgetModes.Edit) {
    return (
      <ChoiceEdit
        choice={choice}
        onSelectionChange={onSelectionChange}
        onDelete={onDelete}
        onTextChange={onTextChange}
      />
    )
  }

  if (mode === WidgetModes.View) {
    return (
      <ChoiceView
        inactive={inactive}
        choice={choice}
        isSelected={isSelected}
        onSelectionChange={onSelectionChange}
        variant={variant}
      />
    )
  }

};

export default Choice;