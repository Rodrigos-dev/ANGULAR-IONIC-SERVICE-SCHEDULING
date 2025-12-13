import { eDynamicField } from 'src/app/shared/enums/dynamic-field.enum';
import {
  eFileAccept,
  IDynamicFormConfig,
} from 'src/app/shared/interfaces/dynamic-form-config.interface';
import { Validators } from '@angular/forms';
import { EMaskType } from 'src/app/shared/components/dynamic-form.component/enums/mask-types.enum';

export const TEST_ALL_FIELDS_FORM_CONFIG = (): IDynamicFormConfig[] => {
  return [
    // === DIVIDER ===
    {
      label: 'Informações Pessoais',
      name: 'personal_info_divider',
      type: {
        field: eDynamicField.DIVIDER,
      },
      size: 12,
    },

    //   IMAGE === VIDEO === DOCUMENTOS
    {
      label: 'IMAGE VIDEO OU DOCUMENTOS',
      name: 'videoImageOrDocuments',
      type: {
        field: eDynamicField.VIDEOIMAGEORDOCUMENTS,
      },
      initialValue: '',
      avatarOrImageHeight: '130px',
      avatarOrImageWidth: '130px',
      ionItemNoneLines: 'none',
      size: 12,
      fileAccept: eFileAccept.ALL,
      maxTotalMedia: 5,
      maxVideos: 1,
    },

    //   // === AVATAR ===
    {
      label: 'Foto de Perfil',
      name: 'avatar',
      type: {
        field: eDynamicField.AVATAR,
      },
      initialValue: '',
      avatarOrImageHeight: '130px',
      avatarOrImageWidth: '130px',
      ionItemNoneLines: 'none',
      size: 12,
      fileAccept: eFileAccept.IMAGE,
    },

    //   // === IMAGE ===
    {
      label: 'Imagem',
      name: 'image',
      type: {
        field: eDynamicField.IMAGE,
      },
      initialValue: '',
      avatarOrImageHeight: '130px',
      avatarOrImageWidth: '130px',
      ionItemNoneLines: 'none',
      size: 12,
      fileAccept: eFileAccept.IMAGE,
    },

    //   // === VIDEO ===
    {
      label: 'Video',
      name: 'video',
      type: {
        field: eDynamicField.VIDEO,
      },
      initialValue: '',
      avatarOrImageHeight: '130px',
      avatarOrImageWidth: '130px',
      ionItemNoneLines: 'none',
      size: 12,
      fileAccept: eFileAccept.VIDEO,
    },

    // === INPUT TEXT ===
    {
      name: 'name',
      type: {
        field: eDynamicField.INPUT,
        typeField: 'text',
      },
      initialValue: '',
      placeholder: 'Digite seu nome completo',
      validations: [Validators.required, Validators.minLength(3)],
      size: 12,
    },
    {
      inputLabel: 'Nome Completo',
      name: 'name3',
      type: {
        field: eDynamicField.INPUT,
        typeField: 'text',
      },
      initialValue: '',
      placeholder: 'Digite seu nome completo',
      validations: [Validators.required, Validators.minLength(3)],
      size: 12,
      fill: 'outline',
      labelPlacement: 'stacked',
    },
    {
      inputLabel: 'Nome Completo',
      name: 'name4',
      type: {
        field: eDynamicField.INPUT,
        typeField: 'text',
      },
      initialValue: '',
      placeholder: 'Digite seu nome completo',
      validations: [Validators.required, Validators.minLength(3)],
      size: 12,
      fill: 'solid',
      labelPlacement: 'floating',
    },
    {
      inputLabel: 'Nome Completo',
      name: 'name2',
      type: {
        field: eDynamicField.INPUT,
        typeField: 'text',
      },
      initialValue: '',
      placeholder: 'Digite seu nome completo',
      validations: [Validators.required, Validators.minLength(3)],
      size: 12,
      fill: 'outline',
      labelPlacement: 'floating',
      borderRadius: '30px',
    },

    // === INPUT EMAIL ===
    {
      inputLabel: 'E-mail',
      name: 'email',
      type: {
        field: eDynamicField.INPUT,
        typeField: 'email',
      },
      initialValue: '',
      placeholder: 'seu@email.com',
      validations: [Validators.required, Validators.email],
      size: 12,
      fill: 'outline',
      labelPlacement: 'floating',
      borderRadius: '30px',
    },

    // === INPUT NUMBER ===
    {
      inputLabel: 'Idade',
      name: 'age',
      type: {
        field: eDynamicField.INPUT,
        typeField: 'number',
      },
      initialValue: null,
      placeholder: 'Sua idade',
      validations: [Validators.required],
      size: 12,
      fill: 'outline',
      labelPlacement: 'floating',
      borderRadius: '30px',
    },

    // === INPUT PASSWORD ===
    {
      inputLabel: 'Senha',
      name: 'password',
      type: {
        field: eDynamicField.INPUT,
        typeField: 'password',
      },
      placeholder: 'Digite sua senha',
      validations: [Validators.required, Validators.minLength(6)],
      showPasswordIcon: false,
      size: 12,
      fill: 'outline',
      labelPlacement: 'stacked',
      borderRadius: '30px',
    },

    // === TEXTAREA ===
    {
      inputLabel: 'Biografia',
      name: 'bio',
      type: {
        field: eDynamicField.TEXTAREA,
      },
      initialValue: '',
      placeholder: 'Conte um pouco sobre você...',
      rows: 4,
      size: 12,
      fill: 'outline',
      labelPlacement: 'stacked',
      borderRadius: '30px',
    },

    // === INPUT COM MÁSCARA ===
    {
      inputLabel: 'Telefone',
      name: 'phone',
      type: {
        field: eDynamicField.INPUT,
        typeField: 'tel',
      },
      mask: EMaskType.Telephone,
      initialValue: '',
      placeholder: '(11) 99999-9999',
      size: 12,
      fill: 'outline',
      labelPlacement: 'stacked',
      borderRadius: '30px',
    },

    // === SWITCH/TOGGLE ===
    {
      label: 'Receber Notificações',
      name: 'receive_notifications',
      type: {
        field: eDynamicField.SWITCH,
      },
      initialValue: true,
      help: 'Receba notificações por e-mail sobre novidades',
      size: 12,
      fill: 'outline',
      labelPlacement: 'stacked',
      borderRadius: '30px',
    },

    //=== SELECT SIMPLES ===
    {
      inputLabel: 'Gênero',
      name: 'gender',
      type: {
        field: eDynamicField.SELECT,
      },
      initialValue: 'male',
      placeholder: 'Selecione seu gênero',
      select: {
        options: [
          { value: 'male', label: 'Masculino' },
          { value: 'female', label: 'Feminino' },
          { value: 'other', label: 'Outro' },
        ],
        mode: 'single',
        showSearch: false,
      },
      size: 12,
      fill: 'outline',
      labelPlacement: 'stacked',
      borderRadius: '30px',
    },

    // === SELECT MÚLTIPLO ===
    {
      inputLabel: 'Interesses',
      name: 'interests',
      type: {
        field: eDynamicField.SELECT,
      },
      placeholder: 'Selecione seus interesses',
      select: {
        options: [
          { value: 'sports', label: 'Esportes' },
          { value: 'music', label: 'Música' },
          { value: 'tech', label: 'Tecnologia' },
          { value: 'books', label: 'Livros' },
          { value: 'travel', label: 'Viagens' },
        ],
        mode: 'multiple',
        showSearch: true,
        maxTagCount: 3,
      },
      size: 12,
      fill: 'outline',
      labelPlacement: 'stacked',
      borderRadius: '30px',
    },

    // === CHECKBOX ===
    {
      label: 'Aceito os termos e condições',
      name: 'accept_terms',
      type: {
        field: eDynamicField.CHECKBOX,
      },
      initialValue: false,
      size: 12,
      fill: 'outline',
      labelPlacement: 'start',
      borderRadius: '30px',
    },

    // === RADIO ===
    {
      inputLabel: 'Nível de Experiência',
      name: 'experience_level',
      type: {
        field: eDynamicField.RADIO,
      },
      initialValue: 'intermediate',
      select: {
        options: [
          { value: 'beginner', label: 'Iniciante' },
          { value: 'intermediate', label: 'Intermediário' },
          { value: 'advanced', label: 'Avançado2' },
          { value: 'beginner2', label: 'Iniciante2' },
          { value: 'intermediate2', label: 'Intermediário2' },
          { value: 'advanced2', label: 'Avançado2' },
        ],
      },
      size: 6,
      fill: 'outline',
      labelPlacement: 'start',
      borderRadius: '10px',
    },

    //=== DATE ===
    {
      inputLabel: 'Data de Nascimento',
      name: 'birth_date',
      type: {
        field: eDynamicField.DATE,
      },
      //initialValue: '1990-01-01',
      placeholder: 'Selecione a data',
      size: 12,
      fill: 'outline',
      labelPlacement: 'start',
      borderRadius: '30px',
    },

    //=== DATE ===
    {
      label: '',
      inputLabel: 'Data de Nascimento',
      name: 'birth_date2',
      type: {
        field: eDynamicField.DATE,
      },
      //initialValue: '1990-01-01',
      placeholder: 'Selecione a data 2',
      size: 12,
      fill: 'outline',
      labelPlacement: 'start',
      borderRadius: '30px',
    },

    // === DATE TIME ===
    {
      inputLabel: 'Data e Hora de Agendamento',
      name: 'agendamentoDataHora',
      type: {
        field: eDynamicField.DATE_TIME,
      },
      placeholder: 'Selecione data e hora',
      size: 12,
      fill: 'outline',
      labelPlacement: 'start',
      borderRadius: '30px',
    },

    // === TIME ===
    {
      inputLabel: 'Horário Preferido',
      name: 'preferred_time',
      type: {
        field: eDynamicField.TIME,
      },
      initialValue: '09:00',
      placeholder: 'Selecione o horário',
      size: 12,
      fill: 'outline',
      labelPlacement: 'start',
      borderRadius: '30px',
    },
  ];
};
