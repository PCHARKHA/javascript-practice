/*A Promise has three states:
Pending → The asynchronous task is still running.
Fulfilled (Resolved) → The task completed successfully.
Rejected → The task failed.
Definition : promise is an object , it represents the eventual or a final result of asynchronous operation
            A Promise can change its state only ONCE.

1. resolve(value)
   -> Marks the Promise as fulfilled.
   -> Stores the successful result.

2. reject(error)
   -> Marks the Promise as rejected.
   -> Stores the error/reason.

3. .then()
   -> Executes only when the Promise is fulfilled.

4. .catch()
   -> Executes only when the Promise is rejected.

5. Whatever is passed to resolve()
   becomes the parameter of .then().

6. Whatever is passed to reject()
   becomes the parameter of .catch().
*/
const orderPromise = new Promise ((resolve,reject) => {
    let paymentSuccessful = true;

    if (paymentSuccessful) {
        resolve("Order Confirmed");
    } else {
        reject("Payment Failed");
    }
});

orderPromise.then(function(result){
    console.log(result);
})
.catch(function(error){
    console.log(error);
})