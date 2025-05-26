import { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
    h2: ({ children, id }) => (
        <h2
            id={id as string}
            className="font-poppins font-medium mt-6 mb-2 text-[28px] lg:text-[30px]"
        >
            {children}
        </h2>
    ),
    h3: ({ children, id }) => (
        <h3 id={id as string} className="font-poppins mt-4 mb-2 text-[22px]">
            {children}
        </h3>
    ),
    p: ({ children }) => <p className="text-darkElement-500 leading-[22px]">{children}</p>,
    ul: ({ children }) => <ul className="list-disc text-darkElement-250 pl-6">{children}</ul>,
    li: ({ children }) => <li className="text-darkElement-400 leading-[22px] mb-2">{children}</li>,
    a: ({ children, href }) => (
        <a
            href={href as string}
            target="_blank"
            className="text-electric-200 hover:text-electric-300"
        >
            {children}
        </a>
    ),
    code: (properties) => {
        return <code {...properties} />;
    },
    pre: ({ children }) => (
        <pre className="bg-[#1a1b26] border border-darkElement-100 rounded-2xl p-4 relative overflow-x-auto">
            {children}
        </pre>
    ),
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        ...mdxComponents,
        ...components,
    };
}
