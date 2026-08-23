// para um middleware de erro, é necessário ter 4 parâmetros, mesmo que não sejam usados todos,
// o express envia o erro automaticamente para esse middleware,
// então é necessário ter o next mesmo que não seja usado
export function errorHandler(err, req, res, next) {
  if (!err.status) console.error(err);
  res
    .status(err.status ?? 500)
    .json({ message: err.message ? err.message : "Erro interno no servidor." });
}
