import Image from "next/image";

export default function Footer() {
  return (
    <div className="bg-walterWhite p-5 flex flex-col items-center justify-center">
      <Image src="/logo.png" width={133} height={23} alt="Full Stack Week" />
      <p className="text-sm font-medium mt-1 text-primaryDarker">
        Todos os direitos reservados.
      </p>
    </div>
  );
}
