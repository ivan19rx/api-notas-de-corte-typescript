-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "nivelacesso" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cursos" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "faculdade" TEXT NOT NULL,
    "notaDeCorte" DOUBLE PRECISION NOT NULL,
    "ano" DOUBLE PRECISION NOT NULL,
    "descricao" TEXT,

    CONSTRAINT "Cursos_pkey" PRIMARY KEY ("id")
);
