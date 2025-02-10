First of all we will install all the dependencies and packages 
then we will set up enviroment variables 

## Enviroment variables 

These are the secret variables and other things which should be kept secret 
The way to store Enviroment variables are different for each libraries and framework like react, next.js and etc
Enviroment variables should be in the root of the project 
with the name .env 

Now .env should be ignored in gitignore and for the reference we create .env.sample 

.env ::
REACT_APP_APPWRITE_URL = "enviroment test"
or we can also write like 
REACT_APP_APPWRITE_URL = enviroment-test

for VITE::

VITE_ANYTHING = "fhaksfha"
acess  import.meta.env.VITE_ANYTHING

points:

there are different methods to acess the enviroment variables in different libraries 
here we have shown the method in app.jsx 
always remember that enviroment variables are loaded only one time usually 



## React-Hook_Form

In react hook form we know that there are many input fields that we create and then
we register each input with some name .

now there is handleSubmit function in which we pass function which will handle the things on submit 
this function takes a input as 'data' . This data is a object that contain all the values of registered input. 

It also provide 'watch' by which we can keep track on real time value of any registered input

It also provide Controller. We need to provider a name to controller so that we can use it as registered input.

Example of watch : 

import { useForm } from "react-hook-form";

const App = () => {
  const { register, handleSubmit, watch } = useForm();

  // Watch a single field
  const name = watch("name");

  // Watch multiple fields
  const [email, age] = watch(["email", "age"]);

  // Watch the entire form
  const formValues = watch();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} placeholder="Name" />
      <input {...register("email")} placeholder="Email" />
      <input {...register("age")} type="number" placeholder="Age" />

      <p>Current Name: {name}</p>
      <p>Current Email: {email}</p>
      <p>Current Age: {age}</p>

      <button type="submit">Submit</button>
    </form>
  );
};

export default App;

