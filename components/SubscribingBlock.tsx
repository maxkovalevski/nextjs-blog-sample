
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
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    content: (
      <>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer libero quam, vestibulum in augue ac, tincidunt volutpat lacus. Pellentesque nibh erat, luctus et iaculis vitae, dignissim aliquet nulla. Pellentesque mattis justo at vehicula aliquam. Nam scelerisque in tortor vel fringilla. 
        </p>
        <p>
          Morbi sed dolor sed nisi pulvinar eleifend. Morbi non urna nec lacus tempor commodo. Cras rutrum magna erat, ac luctus nisl convallis et. Aenean et leo non nunc commodo sollicitudin in vitae elit. Nam sollicitudin dapibus velit sit amet blandit. Donec auctor felis ac dolor faucibus, eu auctor orci consectetur. 
        </p>
        <p>
          Quisque rhoncus vestibulum neque, sed ullamcorper mauris finibus sit amet. Curabitur vitae varius velit, et rhoncus elit. Sed rutrum tempor turpis, id fermentum dolor tempor vitae.
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

