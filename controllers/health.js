const gethealthApi = (req, res) => {
    res.json({
      success: true,
      message: "Servers health is Good.",
    });
  }

  export {gethealthApi}