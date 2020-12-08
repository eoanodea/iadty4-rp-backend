/**
 * log an error and pass it up a level, can be useful for seeing what the fuck is going on in promises
 * DELETE THIS
 *
 * @param err the error to pipe
 */
export const pipeError = (err: Error) => {
  console.log(err);
  throw err;
};
