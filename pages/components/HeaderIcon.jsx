import Image from "next/image";
import Link from "next/link";

const HeaderIcon = ({ href, alt, src }) => {
  return (
    <Link href={href} className="flex justify-start items-center">
      <Image className="mr-2" alt={alt} src={src} width={24} height={24} />
    </Link>
  );
};

export default HeaderIcon;
