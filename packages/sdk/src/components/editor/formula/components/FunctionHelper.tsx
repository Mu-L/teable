import type { FunctionName } from '@teable-group/core/src/formula/functions/common';
import { cn } from '@teable-group/ui-lib';
import type { FC } from 'react';
import { FORMULA_FUNCTIONS_MAP } from '../constants';
import type { IFuncHelpData, IFunctionSchema } from '../interface';

interface ICodeHelperProps {
  funcHelpData: IFuncHelpData | null;
}

export const FunctionHelper: FC<ICodeHelperProps> = (props) => {
  const { funcHelpData } = props;

  if (funcHelpData == null) return null;

  const { funcName, focusParamIndex } = funcHelpData;
  const helpFunc = FORMULA_FUNCTIONS_MAP.get(funcName) as IFunctionSchema<FunctionName>;

  if (helpFunc == null) return null;

  const focusIndex =
    focusParamIndex >= helpFunc.params.length ? helpFunc.params.length - 1 : focusParamIndex;

  return (
    <>
      <code className="flex text-xs">
        {`${funcHelpData.funcName}(`}
        {helpFunc.params.map((param, index) => {
          const isHighlight = index === focusIndex;
          return (
            <span key={index}>
              {index > 0 ? ', ' : null}
              <span className={cn('p-[2px]', isHighlight && 'bg-amber-400 rounded')}>{param}</span>
            </span>
          );
        })}
        {')'}
      </code>
      <code className="mt-[2px] text-xs text-slate-400">
        Example: {helpFunc.example.split('\n')[0]}
      </code>
    </>
  );
};