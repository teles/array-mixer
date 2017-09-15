ArrayMixer
======================

[![Build Status](https://travis-ci.org/teles/array-mixer.svg?branch=master)](https://travis-ci.org/teles/array-mixer)
[![npm](https://img.shields.io/npm/v/array-mixer.svg)]()

The repository contains the ArrayMixer source code.
ArrayMixer is a tiny javascript lib with **less than 1kb** made to help ordering groups of arrays in a very personalized manner.
Powerful and easy to use.

## Table of contents

* [ArrayMixer](#arraymixer)
  * [Common usage](#common-usage)
  * [Installation](#installation)
     * [Node projects](#node-projects)
     * [Web projects](#web-projects)
  * [Parameters](#parameters)
     * [Aliases](#aliases)
     * [Sequence](#sequence)
  * [Examples](#examples)
     * [Example 1) For every 7 photos display an ad:](#example-1-for-every-7-photos-display-an-ad)
     * [Example 2) For every 4 paragraphs of text include two images:](#example-2-for-every-4-paragraphs-of-text-include-two-images)
     * [Example 3) In a group of 8 related links reserve positions 5 and 6 for sponsored links:](#example-3-in-a-group-of-8-related-links-reserve-positions-5-and-6-for-sponsored-links)
     * [Example 4) Display a list of songs including the most successful songs for every 10 songs:](#example-4-display-a-list-of-songs-including-the-most-successful-songs-for-every-10-songs)
     * [Example 5) You can also use larger aliases and the ES6 object shorthand:](#example-5-you-can-also-use-larger-aliases-and-the-es6-object-shorthand)
     * [Example 6) View photos of puppies, kittens and penguins in sequence:](#example-6-view-photos-of-puppies-kittens-and-penguins-in-sequence)
  * [Contributing](#contributing)
  * [License](#license)
  * [Special thanks](#special-thanks)

## Common usage

Let's think we have two arrays:  **photos** and **ads**.

```javascript
photos.length === 12; // true
ads.length === 6; // true
```

Use `ArrayMixer` to create a new array containing **2 photos** followed by **1 ad** until the end of both arrays.


```javascript
let mixedArray = ArrayMixer({P:photos, A:ads}, ["2P", "1A"]);
```

So `mixedArray` will contain:

<table>
<img src="https://placeholdit.imgix.net/~text?txtsize=26&txtclr=fff&bg=c0392b&txt=P[0]&w=78&h=78" align="left" vspace="10">
<img src="https://placeholdit.imgix.net/~text?txtsize=26&txtclr=fff&bg=c0392b&txt=P[1]&w=78&h=78" align="left" vspace="10">
<img src="https://placeholdit.imgix.net/~text?txtsize=26&txtclr=fff&bg=3498db&txt=A[0]&w=78&h=78" align="left" vspace="10">
<img src="https://placeholdit.imgix.net/~text?txtsize=26&txtclr=fff&bg=c0392b&txt=P[2]&w=78&h=78" align="left" vspace="10">
<img src="https://placeholdit.imgix.net/~text?txtsize=26&txtclr=fff&bg=c0392b&txt=P[3]&w=78&h=78" align="left" vspace="10">
<img src="https://placeholdit.imgix.net/~text?txtsize=26&txtclr=fff&bg=3498db&txt=A[1]&w=78&h=78" align="left" vspace="10">
<img src="https://placeholdit.imgix.net/~text?txtsize=26&txtclr=fff&bg=c0392b&txt=P[4]&w=78&h=78" align="left" vspace="10">
<img src="https://placeholdit.imgix.net/~text?txtsize=26&txtclr=fff&bg=c0392b&txt=P[5]&w=78&h=78" align="left" vspace="10">
<img src="https://placeholdit.imgix.net/~text?txtsize=26&txtclr=fff&bg=3498db&txt=A[2]&w=78&h=78" align="left" vspace="10">
<img src="https://placeholdit.imgix.net/~text?txtsize=26&txtclr=fff&bg=c0392b&txt=P[6]&w=78&h=78" align="left" vspace="10">
<img src="https://placeholdit.imgix.net/~text?txtsize=26&txtclr=fff&bg=c0392b&txt=P[7]&w=78&h=78" align="left" vspace="10">
<img src="https://placeholdit.imgix.net/~text?txtsize=26&txtclr=fff&bg=3498db&txt=A[3]&w=78&h=78" align="left" vspace="10">
<img src="https://placeholdit.imgix.net/~text?txtsize=26&txtclr=fff&bg=c0392b&txt=P[8]&w=78&h=78" align="left" vspace="10">
<img src="https://placeholdit.imgix.net/~text?txtsize=26&txtclr=fff&bg=c0392b&txt=P[9]&w=78&h=78" align="left" vspace="10">
<img src="https://placeholdit.imgix.net/~text?txtsize=26&txtclr=fff&bg=3498db&txt=A[4]&w=78&h=78" align="left" vspace="10">
<img src="https://placeholdit.imgix.net/~text?txtsize=26&txtclr=fff&bg=c0392b&txt=P[10]&w=78&h=78" align="left" vspace="10">
<img src="https://placeholdit.imgix.net/~text?txtsize=26&txtclr=fff&bg=c0392b&txt=P[11]&w=78&h=78" align="left" vspace="10">
<img src="https://placeholdit.imgix.net/~text?txtsize=26&txtclr=fff&bg=3498db&txt=A[5]&w=78&h=78" align="left" vspace="10">
</table>

<h2 id="installation">Installation</h2>

`ArrayMixer` can be used in node projects and web projects.

### Node projects

Requires node version **5.7 or later**.

```bash
npm install array-mixer --save
```

Import it to your code using:

```javascript
import ArrayMixer from "array-mixer";
```

### Web projects

[Download latest ES5 transpiled version](https://raw.githubusercontent.com/teles/array-mixer/master/release/array-mixer.es5.js).

Import *ES5* transpiled version to your code.

```html
<script src = "path/to/your/array-mixer-dir/array-mixer.es5.min.js"> </ script>
```

## Parameters

<img src="https://placeholdit.imgix.net/~text?txtsize=22&txtclr=fff&bg=c0392b&txt=Aliases&w=100&h=48" align="left">
<img src="https://placeholdit.imgix.net/~text?txtsize=22&txtclr=fff&bg=3498db&txt=Sequence&w=115&h=48">

`ArrayMixer` has only two mandatory parameters.

```javascript
let aliases = {M:myArray, O:otherArray};
let sequence = ["3M", "50"];

let mixed = ArrayMixer(aliases, sequence);
```


### Aliases

This parameter **should be** an object with keys used as alias for sequence and key values pointing to avaliable arrays.


### Sequence

This parameters uses the aliases defined on **aliases** parameter to create a sequence order to display the arrays.

## Examples

`ArrayMixer` can be used combining different arrays, aliases and sequences.
The following examples shows some ways to use it.

### Example 1) For every 7 photos display an ad:

```javascript
ArrayMixer ({F: Photos, A: Ads}, ["7F", "1A"]);
```
**or** (as number 1 on sequence can be ommited):

```javascript
ArrayMixer ({F: Photos, A: Ads}, ["7F", "A"]);
```

### Example 2) For every 4 paragraphs of text include two images:
```javascript
ArrayMixer ({P: paragraphs, I: images}, ["4F", "2A"]);
```

### Example 3) In a group of 8 related links reserve positions 5 and 6 for sponsored links:
```javascript
ArrayMixer ({R: related, P: sponsored}, ["4R", "2P", "2R"]);
```

### Example 4) Display a list of songs including the most successful songs for every 10 songs:
```javascript
ArrayMixer ({M: musics, S: hits}, ["10M", "2S"]);
```

### Example 5) You can also use larger aliases and the ES6 object shorthand:
```javascript
ArrayMixer ({days, weekend}, ["5days", "2weekend"]);
```

You can manipulate more than two vectors at a time, as in the following example:
 
### Example 6) View photos of puppies, kittens and penguins in sequence:
```javascript
ArrayMixer ({puppies, kittens, penguins}, ["puppies", "kittens", "penguins"));
```

* All arrays mentioned in this section must exist for the examples to work.
 
## Contributing

[Coming soon](CONTRIBUTING.md)

## License

MIT - Jota Teles - 2017

## Special thanks

* [Willian Ribeiro](https://github.com/willianribeiro);
* [João Paulo](https://github.com/jpusp);
