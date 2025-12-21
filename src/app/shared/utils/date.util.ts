import { format, isValid, parse, parseISO } from 'date-fns';
import { EFieldDynamicForm } from '../components/dynamic-form.component/enums/field-dynamic-form.enum';
import { EFormatDateValueInInput } from '../components/dynamic-form.component/enums/input-mode-field.enum';
import { ptBR } from 'date-fns/locale';

export const formatDateFieldInputs = (
  fieldValue: any,
  fieldType: EFieldDynamicForm
): string => {
  if (!fieldValue) {
    return fieldValue;
  }

  if (
    fieldType !== EFieldDynamicForm.TIME &&
    fieldType !== EFieldDynamicForm.DATE &&
    fieldType !== EFieldDynamicForm.DATE_TIME
  ) {
    return fieldValue;
  }

  let dateObject: Date;

  try {
    switch (fieldType) {
      case EFieldDynamicForm.TIME:
        // 1. Verificação crucial: se já for Date, não precisa de parse
        if (fieldValue instanceof Date) {
          dateObject = fieldValue;
        }
        // 2. Se for string curta (ex: "14:30")
        else if (typeof fieldValue === 'string' && fieldValue.length <= 5) {
          dateObject = parse(fieldValue, 'HH:mm', new Date());
        }
        // 3. Se for string ISO (ex: "2025-12-10T17:41...")
        else {
          dateObject = parseISO(fieldValue);
        }

        if (!isValid(dateObject)) return fieldValue;
        return format(dateObject, 'HH:mm');

      case EFieldDynamicForm.DATE_TIME:
        // Aqui você já tinha a proteção 'instanceof Date', por isso não dava erro aqui
        dateObject =
          fieldValue instanceof Date ? fieldValue : parseISO(fieldValue);

        if (!isValid(dateObject)) return fieldValue;
        return format(dateObject, "yyyy-MM-dd'T'HH:mm", { locale: ptBR });

      case EFieldDynamicForm.DATE:
      default:
        // Aqui também já estava protegido
        dateObject =
          fieldValue instanceof Date ? fieldValue : parseISO(fieldValue);

        if (!isValid(dateObject)) return fieldValue;
        return format(dateObject, 'yyyy-MM-dd', { locale: ptBR });
    }
  } catch (error) {
    console.error('Erro ao formatar data para Backend:', error);
    return fieldValue;
  }
};

export const getFormatDateValue = (
  typeField: EFieldDynamicForm
): EFormatDateValueInInput | undefined => {
  switch (typeField) {
    case EFieldDynamicForm.DATE:
      return EFormatDateValueInInput.DATE;
    case EFieldDynamicForm.TIME:
      return EFormatDateValueInInput.TIME;
    case EFieldDynamicForm.DATE_TIME:
      return EFormatDateValueInInput.DATE_TIME;
    default:
      return undefined;
  }
};
