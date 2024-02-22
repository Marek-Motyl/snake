import clsx from "clsx";

export function BoardElementBlank({ children, className, ...rest }: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) {

  return <div className={clsx('flex justify-center items-center border border-solid w-8 h-8 border-black', className)} {...rest}>{children}</div>

}