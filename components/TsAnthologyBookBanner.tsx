// it provided as "globals" in MDXRenderer
// @ts-ignore
const Link = _nextLink;
// @ts-ignore
const PostBanner = _postBanner;
// @ts-ignore
const useConvertkitEmailSubscription = _useConvertkitEmailSubscription;

export const TsAnthologyBookBanner = () => {
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
    title: "Sign Up To Download Free eBook About TypeScript",
    content: (
      <>
        <p>
          This post is part of series and <Link href="/typescript-book">book about TypeScript</Link>. It will guide you from scratch to writing full TypeScript applications on Back End and Front End.
        </p>
        <p>
          The series and the book are still in Work In Progress status but they are already available for everyone. The book is available in PDF format.
        </p>
      </>
    ),
    btnTitle: "Download eBook",
    successView: <div>
      <span>✨ Please go confirm your subscription! After confirmation you will receive a letter with link to download the book. </span>
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

