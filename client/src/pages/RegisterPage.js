import React from "react";

const RegisterPage = () => {
  const [data, setData] = React.useState({
    name: "",
    email: "",
    password: "",
    profile_pic: "",
  });

  const[uploadPhoto, setUploadPhoto] = React.useState("")

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUploadPhoto = (e) => {
    const file = e.target.files[0]
    setUploadPhoto(file)
  }

  console.log('uploadPhoto: ', uploadPhoto);

  return (
    <div className="mt-5">
      <div className="bg-white w-full max-w-sm mx-2 rounded overflow-hidden p-4">
        <h3>Welcome to Chat app</h3>

        <form className="grid gap-3">
          <div className="flex flex-col">
            <label htmlFor="name">Name: </label>
            <input
              className="bg-slate-300 outline-none px-3 py-2 focus:outline-green-500 rounded-lg"
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={data.name}
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email">Email: </label>
            <input
              className="bg-slate-300 outline-none px-3 py-2 focus:outline-green-500 rounded-lg"
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={data.email}
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Password: </label>
            <input
              className="bg-slate-300 outline-none px-3 py-2 focus:outline-green-500 rounded-lg"
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={data.password}
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="profile_pic">
              photo:
              <div className="h-14 bg-slate-200 flex justify-center items-center border hover:border-green-500 rounded-lg hover:cursor-pointer">
                <p className="text-sm">
                  {uploadPhoto.name ? uploadPhoto?.name : "Upload your photo"}
                  </p>
              </div>
            </label>
            <input
              className="bg-slate-300 outline-none px-3 py-2 focus:outline-green-500 rounded-lg hidden"
              type="file"
              id="profile_pic"
              name="profile_pic"
              onChange={handleUploadPhoto}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
