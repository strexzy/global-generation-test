import React from "react";
import katex from "katex";
import "katex/dist/katex.min.css";
import clsx from "clsx";
import type { TipTapNode } from "./types";

export default function TipTapRenderer({
  doc,
  onKatexError,
}: {
  doc: TipTapNode;
  onKatexError?: (err: Error) => void;
}) {
  const renderNode = (node: any, key?: string | number): React.ReactNode => {
    if (!node) return null;

    const { type, content, text, marks, attrs } = node;

    switch (type) {
      case "doc":
        return (
          <div key={key}>
            {content && content.map((n: any, i: number) => renderNode(n, i))}
          </div>
        );
      case "paragraph":
        return (
          <p key={key} className="mb-3 leading-relaxed">
            {content && content.map((n: any, i: number) => renderNode(n, i))}
          </p>
        );
      case "heading":
        return (
          <h3 key={key} className="text-lg md:text-xl font-semibold mb-2">
            {content && content.map((n: any, i: number) => renderNode(n, i))}
          </h3>
        );
      case "bulletList":
        return (
          <ul key={key} className="list-disc pl-5 mb-3">
            {content && content.map((n: any, i: number) => renderNode(n, i))}
          </ul>
        );
      case "orderedList":
        return (
          <ol key={key} className="list-decimal pl-5 mb-3">
            {content && content.map((n: any, i: number) => renderNode(n, i))}
          </ol>
        );
      case "listItem":
        return (
          <li key={key}>
            {content && content.map((n: any, i: number) => renderNode(n, i))}
          </li>
        );
      case "math":
      case "inlineMath": {
        const expr = (attrs && (attrs.content || attrs.value)) || text || "";
        try {
          const html = katex.renderToString(expr, {
            throwOnError: true,
            displayMode: type === "math",
          });
          return (
            <span
              key={key}
              className={clsx(
                type === "math" ? "block my-3" : "inline-block mx-1",
              )}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        } catch (err: any) {
          onKatexError?.(err);
          return (
            <code
              key={key}
              className="bg-gray-100 rounded px-1 text-sm text-red-700"
            >
              {expr}
            </code>
          );
        }
      }
      case "text": {
        let node: React.ReactNode = text;
        if (marks && marks.length) {
          marks.forEach((m: any) => {
            if (m.type === "bold")
              node = <strong className="font-semibold">{node}</strong>;
            if (m.type === "italic") node = <em className="italic">{node}</em>;
            if (m.type === "code")
              node = (
                <code className="font-mono bg-gray-100 px-1 rounded">
                  {node}
                </code>
              );
          });
        }
        return <span key={key}>{node}</span>;
      }
      default:
        return (
          <span key={key}>
            {content && content.map((n: any, i: number) => renderNode(n, i))}
          </span>
        );
    }
  };

  return <div className="prose prose-sm md:prose-base">{renderNode(doc)}</div>;
}
