import { MouseEventHandler } from "react";

import { cn } from "@/libs/utils";

interface IconButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  icon: React.ReactElement;
  className?: string;
}

const IconBtn: React.FC<IconButtonProps> = ({
  onClick,
  icon,
  className
}) => {
  return ( 
    <button 
      onClick={onClick} 
      className={cn(
        'rounded-full flex items-center justify-center bg-white border shadow-md p-2 hover:scale-110 transition',
        className
      )}
    >
      {icon}
    </button>
   );
}

export default IconBtn;