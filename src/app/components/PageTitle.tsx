import Link from "next/link";
import React from "react";

interface Props {
  title?: string;
  href?: string;
  linkCaption?: string;
}

function PageTitle({ title, href, linkCaption }: Props) {
  return (
    <div className="p-4 bg-gradient-to-br from-cyan-400 to-blue-600 flex justify-between">
      <h1 className="text-white text-lg">{title}</h1>
      {href ? (
        <Link
          className="text-white hover:text-cyan-200 transition-colors"
          href={href}
        >
          {linkCaption}
        </Link>
      ) : null}
    </div>
  );
}

export default PageTitle;
