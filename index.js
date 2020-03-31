const express = require('express')
const server = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose');



const paisSchema = {
  nome: {
    type: String,
    required: true
  },
  pib: {
    type: Number,
    required: true
  }
};

// Conectar no banco
mongoose.connect('mongodb://user:password@localhost:27017/pibservice', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
},
// callback de conexão com o banco
function (err) {
  if (err) {
    console.log(err)
  } else {
    console.log('Conectado no banco');

    

    // Subir o servidor
    server.listen(3000, function() {
      console.log('Servidor subiu');
    });
  }
});



const Pais = mongoose.model('paises', paisSchema);






server.use(bodyParser.urlencoded({ extended: true }))


 server.get('/', function (request, response) {
  
  Pais.find({}, function(err, documents) {
    if (err) {
      
      response.end('Erro')
      return
    }

    response.json(documents);
  })
  
  
})


server.get('/:nomeDoPais', function(request, response) {
  const nomeDoPais = request.params.nomeDoPais
  
  Pais.findOne({
    nome: nomeDoPais
  }, function(err, document) {
    if (err) {
      response.end('Erro')
      return
    }

    if (!document) {
      response.end('Not found')
      return
    }

    response.json(document)

  })
})


server.post('/', function  (request, response) {
  const nome = request.body.nome
  const pib = parseInt(request.body.pib)
  

  var pais1 = new Pais ({
    nome,
    pib,
  });

  pais1.save(function (err) {
    if (err) {
      console.log(err)
    } else {
      console.log('Deu Certo')
    }
  })
})



