import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  href?: string;
  className?: string;
  onClick?: () => void;
  position?: 'relative' | 'fixed';
  role?: string;
  ariaLabel?: string;
}

const GradientButton: React.FC<Props> = ({ ariaLabel, role, children, href, className, onClick, position = 'relative' }) => {
  return (
    <a aria-label={ariaLabel} role={role} onClick={onClick} href={href} className={`${position} cursor-pointer inline-flex items-center justify-center px-6 py-3 overflow-hidden font-bold text-white rounded-none shadow-2xl group ${className}`}>
      <span className="absolute inset-0 w-full h-full transition duration-300 ease-out opacity-0 bg-gradient-to-br from-pink-600 via-purple-700 to-blue-400 group-hover:opacity-100"></span>
      <span className="absolute top-0 left-0 w-full bg-gradient-to-b from-white to-transparent opacity-5 h-1/3"></span>
      <span className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent opacity-5"></span>
      <span className="absolute bottom-0 left-0 w-4 h-full bg-gradient-to-r from-white to-transparent opacity-5"></span>
      <span className="absolute bottom-0 right-0 w-4 h-full bg-gradient-to-l from-white to-transparent opacity-5"></span>
      <span className="absolute inset-0 w-full h-full border border-white rounded-none opacity-10"></span>
      <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-5"></span>
      <span className="relative flex items-center gap-x-2 font-light uppercase">{children}</span>
    </a>
  )
}

export default GradientButton