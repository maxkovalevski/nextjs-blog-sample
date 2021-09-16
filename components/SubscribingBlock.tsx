
// it provided as "globals" in MDXRenderer
// @ts-ignore
const Link = _nextLink;
// @ts-ignore
const PostBanner = _postBanner;
// @ts-ignore
const useConvertkitEmailSubscription = _useConvertkitEmailSubscription;

export const SubscribingBlock = () => {
  // it provided as "globals" in MDXRenderer
  // @ts-ignore
  const endpoint = _convertkitEndpoint;
  
  const {
    handleSubmit,
    handleChangeEmail,
    email,
    status,
  } = useConvertkitEmailSubscription({ endpoint: endpoint });

  const params = {
    title: "Weekly Dose Of Software Engineering Stuff",
    content: (
      <>
        <p>
          Be the first to know when I write new post. I also share useful
          resources from my blog and the Internet with memebers of newsletter{" "}
          <Link href="/newsletter">
            <strong>Weekly Dose Of Software Engineering Stuff</strong>
          </Link>
          .
        </p>
        <p>
          The content related to{" "}
          <strong>
            <i>TypeScript</i>
          </strong>
          ,{" "}
          <strong>
            <i>Node</i>
          </strong>
          , programming languages in general, testing for devs, writing and
          note-taking, useful resources about computer science,{" "}
          <strong>
            <i>algorithms and data structures</i>
          </strong>
          , interview preparation, software architecture, books,{" "}
          <strong>
            <i>DevOps</i>
          </strong>
          , and many many other interesting things.
        </p>
        <p>
          Only interesting articles and useful materials.{" "}
          <strong>
            <i>No spam</i>
          </strong>
          .
        </p>
      </>
    ),
    btnTitle: "Subscribe",
    successView: <div>
      <span>✨ Please go confirm your subscription!</span>
    </div>,
    errorView: <div>
      <span>🚨 Oops, Something went wrong! Try again.</span>
    </div>,
    inputName: "email_address",
    inputType: "email",
    inputPlaceholder: "Email address",
    inputValue: email,
    status,
    onSubmit: handleSubmit,
    onChange: handleChangeEmail,
  }

  return (
    <PostBanner {...params} />
  );
};

