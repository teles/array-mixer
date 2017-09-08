## ArrayMixer

<img src="https://s26.postimg.org/m0r34qpjt/kitchen-blender.png" align="center">

[![Build Status](https://travis-ci.org/teles/array-mixer.svg?branch=master)](https://travis-ci.org/teles/array-mixer)
[![npm](https://img.shields.io/npm/v/array-mixer.svg)]()

Reordene grupos de vetores de forma simples e personalizada.

```javascript 
const animals = ["Alligator", "Bear", "Cat", "Dog", "Elephant"];
const colors =  ["Amber", "Blue", "Cyan", "Dim Gray", "Emerald"]; 
```

Use o **ArrayMixer** para ter uma lista misturando esses vetores de forma personalizada. Assim:
 
```javascript 
let mixedArray = ArrayMixer({A: animals, C: colors}, ["3A", "2C"]);  
``` 

Onde `mixedArray` irá conter:

```javascript
["Alligator", "Bear", "Cat", "Amber", "Blue"];
```

## Instalação

### Adicione `ArrayMixer` ao seu projeto npm:

```bash
npm install array-mixer
```

### Importe `ArrayMixer` ao seu código ES6:

```javascript
import ArrayMixer from "array-mixer";
```

### Ou importe o no seu projeto ES5:

```html
<script src="path/to/your/array-mixer-dir/release/array-mixer.es5.min.js"></script>
```

## Parâmetros

`ArrayMixer` é uma função javascript que espera dois parâmetros obrigatórios.

```javascript 
ArrayMixer(parâmetro1, parâmetro2);
```

### parâmetro1 (Apelidos para vetores existentes)

Lembra do exemplo [com animais e cores](#arraymixer) ? Supondo que ainda temos essas variáveis o parâmetro1 é um **objeto javascript**.
As propriedades desse objeto são apelidos para os vetores e seus valores apontam para os vetores originais. Assim:

```javascript 
{C: colors, A:animals}
```

### parâmetro2 (A sequência esperada pro seu novo vetor)

Continuando no mesmo exemplo, vamos supor que você precise de 2 itens de cada um desses vetores. 
O parâmetro2 é onde você define isso. Assim:


```javascript 
["2C", "2A"]
```

Juntando ambos os parâmetros fica assim:

```javascript 
ArrayMixer({A: animals, C: colors}, ["2C", "2A"]);  
``` 

## Exemplos de aplicação 

Misturar animais e cores é um exemplo com finalidade puramente didática. No entanto no mundo real outras aplicações para `ArrayMixer` são simples de encontrar. 

### Para cada 7 fotos exiba um anúncio

```javascript 
ArrayMixer({F: fotos, A: anuncios}, ["7F", "A"]);            
```

### Para cada 4 parágrafos de texto inclua duas imagens

```javascript 
ArrayMixer({P: paragrafos, I: imagens}, ["4F", "2A"]);            
```

### Em um grupo de 8 links relacionados reserve as posiçÕes 5 e 6 para links patrocinados
 
```javascript 
ArrayMixer({R: relacionados, P: patrocinados}, ["4R", "2P", "2R"]);            
```
 
### Exiba uma lista de músicas incluindo as de mais sucesso a cada 10 músicas
 
```javascript 
ArrayMixer({M: musicas, S: sucessos}, ["10M", "2S"]);            
```

### Você também pode usar apelidos maiores e o object shorthand do ES6
 
```javascript 
ArrayMixer({dias, fds}, ["5dias", "2fds"]);            
```

Você pode manipular mais de dois vetores de uma vez só, como no exemplo seguinte:

 
### Exiba fotos de cachorrinhos, gatinhos e pinguins na sequência

```javascript 
ArrayMixer({cachorrinhos, gatinhos, pinguins}, ["cachorrinhos", "gatinhos", "pinguins"]);            
``` 

* Os vetores mencionados nos exemplos precisam existir para os exemplos funcionem.
 
## Licença

MIT - Jota Teles - 2017
