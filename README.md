# summernote-mathjax

A Summernote plugin to enable LaTeX rendering and editing within the Summernote WYSIWYG editor. This plugin integrates MathJax for rendering mathematical expressions, allowing users to include and edit LaTeX code seamlessly.

## Features

- Add and edit LaTeX equations directly within Summernote.
- Render equations with MathJax for accurate mathematical display.
- Toolbar integration for easy access to the LaTeX editor.

## Demo
[Test drive the demo](https://memorix101.github.io/summernote-mathjax/)

## Installation

1. Include the required dependencies in your HTML file:
   - [jQuery](https://code.jquery.com/)
   - [Bootstrap](https://getbootstrap.com/)
   - [Summernote](https://summernote.org/)
   - [MathJax](https://www.mathjax.org/)

2. Add the `summernote-latex.js` plugin file to your project.

3. Include the plugin in your project:
   ```html
   <script src="summernote-latex.js"></script>
   ```

## Usage

- Initialize Summernote with the LaTeX plugin:
   ```javascript
   $('#summernote').summernote({
       placeholder: 'Type your content here...',
       tabsize: 2,
       height: 300,
       toolbar: [
           ['style', ['style']],
           ['font', ['bold', 'underline', 'clear']],
           ['color', ['color']],
           ['para', ['ul', 'ol', 'paragraph']],
           ['table', ['table']],
           ['insert', ['link', 'picture', 'video', 'latex']],
           ['view', ['fullscreen', 'codeview', 'help']]
       ]
   });
   ```

- Use the `latex` button in the toolbar to open the LaTeX editor.

- Enter LaTeX equations such as:
   ```latex
   \frac{3}{5}+\frac{1}{5}
   x^n + y^n = z^n
   \sqrt{x^2+1}
   ```

- Equation size configurable with
```html
<style>
.MathJax_Exp 
{
    font-size: 45px;
}
</style>
```

## Dependencies

- jQuery 3.5.1 or higher
- Bootstrap 3.4.1
- Summernote 0.9.0
- MathJax 2.7.7

## Customization

Customize the MathJax settings by modifying the script source:
```html
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML"></script>
```

## License

This project is licensed under the [MIT License](LICENSE).

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests on the [GitHub repository](#).

## Acknowledgments

- [Summernote](https://summernote.org/)
- [MathJax](https://www.mathjax.org/)
