bootstrap-tabdrop
=================

A fork of Stefan Petre's bootstrap-tabdrop.js, the original of which can be found at eyecon.ro/bootstrap-tabdrop.

For use with the bootstrap tab component. Creates a tab containing a dropdown menu of tab items that won't fit on the page, when your tabs do not fit in a single row.

Works with horizontal tabs and pills.

## Dependencies

* [Bootstrap](http://twitter.github.com/bootstrap/) 2.0.4+
* [jQuery](http://jquery.com/) 1.7.1+

## Usage

Call the tab drop via javascript on `.nav-tabs` and `.nav-pills` (as appropriate) with an optional options object:

```javascript
$('.nav-pills, .nav-tabs').tabdrop(options);
```

## Options

#### text
Type: string

Default: icon
```html
<i class="icon-align-justify"></i>
```

## Methods

#### tabdrop(options)

Initialises a tab drop.
```javascript
.tabdrop(options);
```

#### .tabdrop('layout')

Checks if the tabs fit in one single row.
```javascript
.tabdrop('layout');
```