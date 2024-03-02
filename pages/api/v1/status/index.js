function status(request, response) {
  response.status(200).json({ status: "OK, a API está funcionando" });
}

export default status;
