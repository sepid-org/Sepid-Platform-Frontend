export type ChoiceVariantType = 'checkbox' | 'radio';

export type ChoiceType = {
  id?: number;
  text: string;
  is_correct?: boolean;
  disabled?: boolean;
}
