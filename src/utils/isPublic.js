const isPublic = () => {
  if (localStorage.getItem("token")) {

      window.location.replace("/dashboard");

  }
};
export default isPublic;
