import { format, isValid, parse, parseISO } from 'date-fns';
import { EFieldDynamicForm } from '../components/dynamic-form.component/enums/field-dynamic-form.enum';
import { EFormatDateValueInInput } from '../components/dynamic-form.component/enums/input-mode-field.enum';
import { ptBR } from 'date-fns/locale';

export const formatDateFieldInputs = (
  fieldValue: any,
  fieldType: EFieldDynamicForm
): string => {
  // const formatString = getFormatDateValue(fieldType);

  // if (!formatString) {
  //   return fieldValue;
  // }

  // let dateObject: Date;

  // try {
  //   switch (fieldType) {
  //     case EFieldDynamicForm.TIME:
  //       if (fieldValue instanceof Date) {
  //         dateObject = fieldValue;
  //       } else if (typeof fieldValue === 'string' && fieldValue.length <= 5) {
  //         dateObject = parse(fieldValue, 'HH:mm', new Date());
  //       } else {
  //         dateObject = new Date(fieldValue);
  //       }
  //       break;

  //     case EFieldDynamicForm.DATE_TIME:
  //       dateObject = parseISO(fieldValue);
  //       break;

  //     case EFieldDynamicForm.DATE:
  //     default:
  //       dateObject =
  //         fieldValue instanceof Date ? fieldValue : parseISO(fieldValue);
  //       break;
  //   }

  //   if (!isValid(dateObject)) {
  //     console.warn(
  //       `Valor inválido detectado para o campo ${fieldType}.`,
  //       fieldValue
  //     );
  //     return fieldValue;
  //   }

  //   // 🔑 TIME sempre retorna só HH:mm
  //   if (fieldType === EFieldDynamicForm.TIME) {
  //     return format(dateObject, 'HH:mm');
  //   }

  //   return format(dateObject, formatString, { locale: ptBR });

  if (!fieldValue) {
    return fieldValue;
  }

  let dateObject: Date;

  try {
    switch (fieldType) {
      case EFieldDynamicForm.TIME:
        // input[type=time] → "HH:mm"
        if (typeof fieldValue === 'string' && fieldValue.length <= 5) {
          dateObject = parse(fieldValue, 'HH:mm', new Date());
        } else {
          dateObject = parseISO(fieldValue);
        }

        if (!isValid(dateObject)) return fieldValue;

        return format(dateObject, 'HH:mm');

      case EFieldDynamicForm.DATE_TIME:
        // input[type=datetime-local] → "2025-12-10T17:41"
        dateObject =
          fieldValue instanceof Date ? fieldValue : parseISO(fieldValue);

        if (!isValid(dateObject)) return fieldValue;

        return format(dateObject, 'dd/MM/yyyy HH:mm', {
          locale: ptBR,
        });

      case EFieldDynamicForm.DATE:
      default:
        // input[type=date] → "2025-12-02"
        dateObject =
          fieldValue instanceof Date ? fieldValue : parseISO(fieldValue);

        if (!isValid(dateObject)) return fieldValue;

        return format(dateObject, 'dd/MM/yyyy', {
          locale: ptBR,
        });
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
