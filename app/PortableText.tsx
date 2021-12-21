import BlockContent from "@sanity/block-content-to-react";
import YouTube from "react-youtube";
import { Tweet } from "react-twitter-widgets";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

export const PortableText = ({ blocks }: { blocks: any[] }) => {
  return (
    <BlockContent
      blocks={blocks}
      imageOptions={{ w: 640, h: 320, fit: "max" }}
      serializers={{
        unknownType: (params: any) => (
          <div>
            <small>Missing component</small>
            <pre>{JSON.stringify(params, null, 2)}</pre>
          </div>
        ),
        marks: {
          internalLink: (props) => <span style={{}}> {props.children} </span>
        },
        types: {
          muxVideo: ({ node }) => {
            return (
              <mux-video
                height="320"
                playback-id={node.playback_id}
                stream-type="on-demand"
                controls
              ></mux-video>
            );
          },
          twitterEmbed: ({ node }) => {
            const { data } = node;
            return <Tweet tweetId={data.id} />;
          },
          youtube: ({ node }) => {
            const parts = node.url.split("/");
            let videoId = parts[parts.length - 1]; 
            if (videoId.match(/^watch/)) {
              videoId = videoId.split("watch?v=")[1]
            }
            return <YouTube videoId={videoId} />;
          },
          callToAction: ({ node }) => (
            <a target="_blank" href={node.url}>
              {node.linkText}
            </a>
          ),
          gotcha: ({node}) => {
            return <div style={{border: "5px solid salmon", padding: "10px", margin: "10px"}}>
              <PortableText blocks={node.body}/>
            </div>
          },
          example: ({node}) => {
            return <div style={{paddingLeft: "15px", margin: "10px"}}>
              <PortableText blocks={node.body}/>
            </div>
          },
          code: ({node}) => {
            return <SyntaxHighlighter language={node.language}>
            {node.code}
          </SyntaxHighlighter>
          }
        },
      }}
    />
  );
};
