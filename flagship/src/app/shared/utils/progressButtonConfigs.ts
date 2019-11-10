import { MatProgressButtonOptions } from 'mat-progress-buttons';

export const indeterminateOptions = (text: string): MatProgressButtonOptions => {
    return {
        active: false,
        text: text,
        buttonColor: 'primary',
        barColor: 'accent',
        raised: true,
        stroked: false,
        mode: 'indeterminate',
        value: 0,
        customClass: '',
        disabled: false,
      };  
}
