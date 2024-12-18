const express = require('express');
const app = express();
app.use(express.json());

let pessoas = [
    { id: 1, nome: 'João', idade: 30 },
    { id: 2, nome: 'Maria', idade: 25 }
];

app.get('/pessoa', (req, res) => {
    res.json(pessoas);
});

app.get('/pessoa/:id', (req, res) => {
    const { id } = req.params;
    const pessoa = pessoas.find(p => p.id == id);
    res.json(pessoa);
});

app.post('/pessoa', (req, res) => {
    const { nome, idade } = req.body;

    const newId = pessoas.length > 0 ? Math.max(...pessoas.map(p => p.id)) + 1 : 1;
    const novaPessoa = { id: newId, nome, idade };
    pessoas.push(novaPessoa);

    res.status(201).json(novaPessoa);
});

app.put('/pessoa/:id', (req, res) => {
    const { id } = req.params;
    const { nome, idade } = req.body;
    const pessoaIndex = pessoas.findIndex(p => p.id == id);
    if (pessoaIndex !== -1) {
        if (nome) pessoas[pessoaIndex].nome = nome;
        if (idade) pessoas[pessoaIndex].idade = idade;
        res.json(pessoas[pessoaIndex]);
    }
});

app.delete('/pessoa/:id', (req, res) => {
    const { id } = req.params;
    const pessoaIndex = pessoas.findIndex(p => p.id == id);
    if (pessoaIndex !== -1) {
        const pessoaRemovida = pessoas.splice(pessoaIndex, 1);
        res.json({ message: 'Pessoa excluída', pessoa: pessoaRemovida });
    }
});

app.listen(3000, () => {
    console.log('Servidor em execução...');
});
