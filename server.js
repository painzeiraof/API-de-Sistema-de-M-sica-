const express = require("express");
const cors = require("cors");
const conexao = require("./db.js");

const app = express();
const PORTA = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({ mensagem: "API sistema de músicas funcionando" })
});

app.get("/artistas", (req, res) => {
    const sql = "SELECT * FROM artistas";

    conexao.query(sql, (erro, resultado) => {
        if (erro) {
            return res.status(500).json({
                erro: "Erro ao listar artistas"
            });
        }
        res.status(200).json(resultado);
    });
});

app.get("/artistas/:id", (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM artistas WHERE id = ${id}`;

    conexao.query(sql, (erro, resultado) => {
        if (erro) {
            return res.status(500).json({
                erro: "Erro ao listar artistas"
            });
        }

        if (resultado.length === 0) {
            return res.status(404).json({
                erro: "Artista não encontrado"
            });
        }
        res.status(200).json(resultado[0]);
    });
});

app.post("/artistas", (req, res) => {
    const { nome, genero, pais } = req.body;

if (!nome || !genero || !pais) {
    return res.status(400).json({
        erro: "Os campos nome, genero e pais são obrigatórios"
    });
}

    const sql = `INSERT INTO artistas (nome, genero, pais) VALUES (?,?,?)`

    conexao.query(sql, [nome, genero, pais], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({
                erro: "Erro ao listar artistas"
            });
        }
            res.status(201).json({
             mensagem: "Artista encontrado com sucesso",
            id: resultado.insertId
        });
    });
});

app.delete("/artistas/:id", (req, res) => {
    const id = Number(req.params.id);

    //const sql = `DELETE FROM artistas WHERE id = ${id}`;
    const sql = `DELETE FROM artistas WHERE id = ?`;

    conexao.query(sql, [id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({
                erro: "Erro ao excluir artista."
            });
        }
        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensagem: "Artista não encontrado"
            });
        }
        res.status(200).json({
            msg: "Artista excluído com sucesso"
        });
    });
});

app.put("/artistas/:id", (req, res) => {
    const id = Number(req.params.id);
    const { nome, genero, pais } = req.body;
    if (!nome || !genero || !pais) {
    return res.status(400).json({
        erro: "Os campos nome, genero e pais são obrigatórios"
    });
}

    const sql = "UPDATE artistas SET nome = ?, genero = ?, pais = ? WHERE id = ?";

    conexao.query(sql, [nome, genero, pais, id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ erro: "Erro ao atualizar artista" });
        }
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ msg: "Artista não encontrado" });
        }
        res.status(200).json({ msg: "Artista atualizado com sucesso" });
    })
});


app.get("/albuns", (req, res) => {
    const sql = `SELECT * FROM albuns;`;

    conexao.query(sql, (erro, resultado) => {
        if (erro) {
            return res.status(500).json({
                erro: "Erro ao listar álbum"
            });
        }

        if (resultado.length === 0) {
            return res.status(404).json({
                erro: "Álbum não encontrado"
            });
        }
        res.status(200).json(resultado);
    });
});


app.get("/albuns/:id", (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM albuns WHERE id = ${id}`;

    conexao.query(sql, (erro, resultado) => {
        if (erro) {
            return res.status(500).json({
                erro: "Erro ao listar álbum"
            });
        }

        if (resultado.length === 0) {
            return res.status(404).json({
                erro: "Álbum não encontrado"
            });
        }
        res.status(200).json(resultado[0]);
    });
});

app.post("/albuns", (req, res) => {
    const { titulo, ano_lancamento, artista_id } = req.body;

if (!titulo || !ano_lancamento || !artista_id) {
    return res.status(400).json({
        erro: "Os campos título, ano_lançamento e artista_id são obrigatórios"
    });
}

    const sql = `INSERT INTO albuns (titulo, ano_lancamento, artista_id) VALUES (?,?,?)`

    conexao.query(sql, [titulo, ano_lancamento, artista_id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({
                erro: "Erro ao listar albuns"
            });
        }
            res.status(201).json({
             mensagem: "Album encontrado com sucesso",
            id: resultado.insertId
        });
    });
});

app.delete("/albuns/:id", (req, res) => {
    const id = Number(req.params.id);

    //const sql = `DELETE FROM albuns WHERE id = ${id}`;
    const sql = `DELETE FROM albuns WHERE id = ?`;

    conexao.query(sql, [id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({
                erro: "Erro ao excluir album."
            });
        }
        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensagem: "Album não encontrado"
            });
        }
        res.status(200).json({
            msg: "Álbum excluído com sucesso"
        });
    });
});

app.put("/albuns/:id", (req, res) => {
    const id = Number(req.params.id);
    const { titulo, ano_lancamento, artista_id } = req.body;
    if (!titulo || !ano_lancamento || !artista_id) {
    return res.status(400).json({
        erro: "Os campos título, ano_lançamento e artista_id são obrigatórios"
    });
}

    const sql = "UPDATE albuns SET titulo = ?, ano_lancamento = ?, artista_id = ? WHERE id = ?";

    conexao.query(sql, [titulo, ano_lancamento, artista_id, id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ erro: "Erro ao atualizar album" });
        }
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ msg: "Album não encontrado" });
        }
        res.status(200).json({ msg: "Album atualizado com sucesso" });
    })
});

app.get("/musicas", (req, res) => {
    const sql = `SELECT * FROM musicas`;

    conexao.query(sql, (erro, resultado) => {
        if (erro) {
            return res.status(500).json({
                erro: "Erro ao listar álbum"
            });
        }

        if (resultado.length === 0) {
            return res.status(404).json({
                erro: "Álbum não encontrado"
            });
        }
        res.status(200).json(resultado);
    });
});

app.get("/musicas/:id", (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM musicas WHERE id = ${id}`;

    conexao.query(sql, (erro, resultado) => {
        if (erro) {
            return res.status(500).json({
                erro: "Erro ao listar musicas"
            });
        }

        if (resultado.length === 0) {
            return res.status(404).json({
                erro: "música não encontrada"
            });
        }
        res.status(200).json(resultado[0]);
    });
});

app.post("/musicas", (req, res) => {
    const { titulo, duracao, album_id } = req.body;

if (!titulo || !duracao || !album_id) {
    return res.status(400).json({
        erro: "Os campos título, duração e album_id são obrigatórios"
    });
}

    const sql = `INSERT INTO musicas (titulo, duracao, album_id) VALUES (?,?,?)`

    conexao.query(sql, [titulo, duracao, album_id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({
                erro: "Erro ao listar músicas"
            });
        }
            res.status(201).json({
             mensagem: "Música encontrada com sucesso",
            id: resultado.insertId
        });
    });
});

app.delete("/musicas/:id", (req, res) => {
    const id = Number(req.params.id);

    //const sql = `DELETE FROM musicas WHERE id = ${id}`;
    const sql = `DELETE FROM musicas WHERE id = ?`;

    conexao.query(sql, [id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({
                erro: "Erro ao excluir musica."
            });
        }
        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensagem: "Música não encontrada"
            });
        }
        res.status(200).json({
            msg: "Música excluída com sucesso"
        });
    });
});

app.put("/musicas/:id", (req, res) => {
    const id = Number(req.params.id);
    const { titulo, duracao, album_id } = req.body;
    if (!titulo || !duracao || !album_id) {
    return res.status(400).json({
        erro: "Os campos título, duração e album_id são obrigatórios"
    });
}

    const sql = "UPDATE musicas SET titulo = ?, duracao = ?, album_id = ? WHERE id = ?";

    conexao.query(sql, [titulo, duracao, album_id, id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ erro: "Erro ao atualizar músicas" });
        }
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ msg: "Música não encontrada" });
        }
        res.status(200).json({ msg: "Música atualizada com sucesso" });
    })
});


app.get("/musicas-completas",(req, res)=>{
      const sql = `SELECT musicas.id, musicas.titulo AS musica, musicas.duracao, albuns.titulo AS album,
albuns.ano_lancamento, artistas.nome AS artista, artistas.genero, artistas.pais
FROM musicas
INNER JOIN albuns ON musicas.album_id = albuns.id
INNER JOIN artistas ON albuns.artista_id = artistas.id;`;

    conexao.query(sql, (erro, resultado) => {
        if (erro) {
            return res.status(500).json({
                erro: "Erro ao listar álbum"
            });
        }

        if (resultado.length === 0) {
            return res.status(404).json({
                erro: "Álbum não encontrado"
            });
        }
        res.status(200).json(resultado);
    });
});

app.get("/artistas/:id/musicas",(req,res)=>{
    const sql = `SELECT musicas.id, musicas.titulo AS musica, musicas.duracao, albuns.titulo AS album,albuns.ano_lancamento,
     artistas.nome AS artista, artistas.genero, artistas.paisFROM musicas INNER JOIN albuns 
     ON musicas.album_id = albuns.id INNER JOIN artistas ON albuns.artista_id = artistas.id`;

     conexao.query(sql, (erro, resultado) => {
        if (erro) {
            return res.status(500).json({
                erro: "Erro ao listar músicas"
            });
        }

        if (resultado.length === 0) {
            return res.status(404).json({
                erro: "Músicas não encontradas"
            });
        }
        res.status(200).json(resultado);
    });
});

app.get("/artistas/:id/albuns",(req,res)=>{
    const sql = `SELECT musicas.id, musicas.titulo AS musica, musicas.duracao, albuns.titulo AS album,albuns.ano_lancamento,
     artistas.nome AS artista, artistas.genero, artistas.paisFROM musicas INNER JOIN albuns 
     ON musicas.album_id = albuns.id INNER JOIN artistas ON albuns.artista_id = artistas.id`;

     conexao.query(sql, (erro, resultado) => {
        if (erro) {
            return res.status(500).json({
                erro: "Erro ao listar álbum"
            });
        }

        if (resultado.length === 0) {
            return res.status(404).json({
                erro: "Álbum não encontrado"
            });
        }
        res.status(200).json(resultado);
    });
});

app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
});
