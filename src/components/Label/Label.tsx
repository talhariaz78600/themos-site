import React, { FC } from "react";

export interface LabelProps {
  className?: string;
  children:any;
  noLabel :any;
  isError:any;
  htmlFor: string;
}

const Label: FC<LabelProps> = ({ className = "", children, isError, noLabel,htmlFor }) => {  
  return (
    <label
      className={`            
        nc-Label 
        absolute 
        left-5 
        
      
        px-1.5 
        peer-focus:-top-3.5 
        -top-3.5    
        text-xs 
        font-medium   
                    
        peer-placeholder-shown:text-sm        
        peer-placeholder-shown:inset-y-4                        
        peer-focus:text-xs         
        transition-all    
        pointer-events-none
        ${isError!="" ? "peer-placeholder-shown:text-red-500 dark:peer-placeholder-shown:text-red-500 text-red-500" 
        : 
        "peer-placeholder-shown:text-neutral-200 peer-focus:text-neutral-500" } 
        ${className}`}
      data-nc-id="Label"
    >
      {children} 
    </label>
  );
};

export default Label;
