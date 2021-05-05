export interface TimeOptions {
  weekday: "long" | "short" | "narrow";
  month: "long" | "short" | "narrow" | "numeric" | "2-digit";
  day: "numeric" | "2-digit";
}
export interface ListInterface {
  name: string;
  id: number;
  done: boolean;
  trash: boolean;
}

export interface ElementInterface {
  classList: { toggle: (arg0: string) => void };
  parentNode: {
    parentNode: { removeChild: (arg0: any) => void },
    querySelector: (
      arg0: string
    ) => {
      (): any;
      new (): any;
      classList: {
        (): any;
        new (): any;
        toggle: { (arg0: string): void; new (): any };
      };
    };
  };
  id: number;
}
