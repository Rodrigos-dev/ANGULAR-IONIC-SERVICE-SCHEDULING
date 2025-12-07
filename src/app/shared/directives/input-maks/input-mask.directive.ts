import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2, // 🚨 Necessário para atualização de VIEW no Ionic
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
// Assumindo que maskUtils e eMaskType estão no seu caminho correto
import { maskUtils } from '../../utils/input-masks.utils';
import { EMaskType } from '../../components/dynamic-form.component/enums/mask-types.enum';

@Directive({
  selector: '[appInputMask]',
  standalone: true,
  // 🚨 O PROVEDOR NG_VALUE_ACCESSOR FOI REMOVIDO PARA EVITAR O ERRO 'More than one custom value accessor'
})
// Implementamos ControlValueAccessor para usar o NgControl para se auto-referenciar
export class InputMaskDirective implements ControlValueAccessor {
  // Definimos o Input como sendo do tipo MaskType
  @Input('appInputMask') eMaskType: EMaskType | undefined | null;

  // Funções fornecidas pelo Angular (NgControl as vincula)
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  // Mapeamento das chaves do Enum para as funções do maskUtils
  private readonly maskFunctions: {
    [key in EMaskType]?: (value: string) => string;
  } = {
    [EMaskType.Telephone]: maskUtils.maskTelephone,
    [EMaskType.Plate]: maskUtils.maskPlate,
    [EMaskType.PostalCode]: maskUtils.maskPostalCode,
    [EMaskType.Cpf]: maskUtils.maskCpf,
    [EMaskType.Cnpj]: maskUtils.maskCnpj,
    [EMaskType.Rg]: maskUtils.maskRg,
    [EMaskType.Weight]: maskUtils.maskWeight,
    [EMaskType.Measure]: maskUtils.maskMeasure,
    [EMaskType.Money]: maskUtils.maskMoney,
  };

  // 🚨 Injetamos NgControl para obter acesso ao CVA nativo e substituí-lo
  constructor(
    private readonly el: ElementRef,
    private readonly control: NgControl,
    private readonly renderer: Renderer2 // Para manipulação segura do DOM
  ) {
    // 🚨 AQUI ESTÁ A CHAVE PARA O ERRO 'More than one CVA'
    // O Angular usa esta injeção para encontrar o CVA nativo e permite
    // que o definamos como a própria diretiva (no ngOnInit).
    this.control.valueAccessor = this;
  }

  // 1. RECEBE O VALOR DO MODELO (Ex: Quando o form é carregado com patchValue)
  writeValue(rawValue: string): void {
    if (rawValue && this.eMaskType) {
      const maskFn = this.maskFunctions[this.eMaskType];
      if (maskFn) {
        // Aplica a máscara no valor limpo para exibir
        const maskedValue = maskFn(rawValue);

        // 🚨 Atualiza a View de forma segura com Renderer2
        this.renderer.setProperty(this.el.nativeElement, 'value', maskedValue);
      }
    } else {
      // Limpa a View
      this.renderer.setProperty(this.el.nativeElement, 'value', rawValue);
    }
  }

  // 2. REGISTRA A FUNÇÃO DE CALLBACK PARA O MODELO
  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  // 3. REGISTRA A FUNÇÃO DE CALLBACK PARA O onTouched
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    if (!this.eMaskType) {
      // Se não houver máscara, envia o valor do HTML diretamente para o modelo
      this.onChange(this.el.nativeElement.value);
      return;
    }

    const input = this.el.nativeElement.value;
    const rawValue = maskUtils.unmask(input); // Valor LIMPO (para o Modelo)

    const maskFn = this.maskFunctions[this.eMaskType];
    if (!maskFn) {
      return;
    }

    let maskedValue: string;

    // 4. Aplica a máscara para VIEW
    if (
      this.eMaskType === EMaskType.Weight ||
      this.eMaskType === EMaskType.Measure ||
      this.eMaskType === EMaskType.Money
    ) {
      maskedValue = maskFn(rawValue.replace(/\D/g, ''));
    } else {
      maskedValue = maskFn(rawValue);
    }

    // 5. Atualiza o input visualmente (VIEW)
    // Usamos Renderer2 para evitar que o Ionic/Angular sobrescreva a máscara
    this.renderer.setProperty(this.el.nativeElement, 'value', maskedValue);

    // 6. ENVIA O VALOR LIMPO PARA O MODELO (FORMCONTROL)
    // Esta é a linha que garante que o form.value não tenha máscara
    this.onChange(rawValue);

    // 7. Interrompe o evento
    // Isso é VITAL para impedir que o ion-input nativo envie o valor mascarado para o NgControl.
    event.preventDefault();
    event.stopImmediatePropagation();

    this.onTouched();

    // Opcional: Se o cursor estiver pulando, você pode tentar forçar a posição
    // const nativeElement = this.el.nativeElement as HTMLInputElement;
    // nativeElement.selectionStart = nativeElement.selectionEnd = maskedValue.length;
  }
}
