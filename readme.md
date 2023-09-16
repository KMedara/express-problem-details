Problem Details by convention

<h2>How to use</h2>

```
const Map = () => {
const options: ProblemDetailsOptions = new ProblemDetailsOptions();

///options.mapToStatusCode(UserNotFoundError, HttpStatus.InternalServerError);
///options.map(UserNotFoundError, (err) => ({details: 'hello'}));

///options.map(UserNotFoundError, (err) => ProblemDetails.createFromError(err));
///options.mapToProblemDetails(UserNotFoundError, HttpStatus.BadRequest, 'url');
return options;
};
const factoryConfiguration: ProblemDetailsFactoryConfiguration = new ProblemDetailsFactoryConfiguration(Map);

const factory = new ProblemDetailsFactory(factoryConfiguration);
app.use('/users', userRouter);

app.use(errorHandler(factory));
```

https://cameronnokes.com/blog/the-30-second-guide-to-publishing-a-typescript-package-to-npm/
https://docs.github.com/en/packages/quickstart
https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry
https://docs.github.com/en/actions/publishing-packages/publishing-nodejs-packages