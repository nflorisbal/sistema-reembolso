import { Theme } from "../theme";

export enum StatusEnum {
  ABERTO = 'Aberto' as any,
  FECHADO = 'Fechado' as any,
  APROVADOG = 'Aprovado Gestor' as any,
  REPROVADOG = 'Reprovado Gestor' as any,
  REPROVADOF = 'Reprovado Financeiro' as any,
}

export enum StatusColor {
  ABERTO = `${Theme.color.highlightPure}` as any,
  FECHADO = `${Theme.color.secondaryDark}` as any,
  APROVADOG = `${Theme.color.highlightPure}` as any,
  REPROVADOG = `${Theme.color.negativeAction}` as any,
  REPROVADOF = `${Theme.color.negativeAction}` as any,
};
