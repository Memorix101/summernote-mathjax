(function(factory) {
    /* global define */
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('jquery'));
    } else {
        factory(window.jQuery);
    }
}(function($) {

    $.extend($.summernote.plugins, {

        'latex': function(context) {
            var self = this;
            var ui = $.summernote.ui;

            // Button für LaTeX Plugin
            context.memo('button.latex', function() {
                var button = ui.button({
                    contents: '<?xml version="1.0" encoding="iso-8859-1"?>\n' +
                        '<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->\n' +
                        '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n' +
                        '<svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" \n' +
                        '\t width="14px" height="14px" viewBox="0 -300 484 800"\n' +
                        '\t xml:space="preserve">\n' +
                        '<g>\n' +
                        '\t<path d="M395.527,97.043V55.352H124.537l159.46,171.507c9.983,10.749,9.848,27.458-0.319,38.026L126.017,428.861h269.504v-25.18\n' +
                        '\t\tc0-15.256,12.413-27.668,27.674-27.668c15.256,0,27.681,12.412,27.681,27.668v52.848c0,15.262-12.419,27.681-27.681,27.681H61.014\n' +
                        '\t\tc-11.106,0-21.107-6.603-25.464-16.834c-4.359-10.226-2.189-22.012,5.509-30.026l184.584-191.964L40.743,46.521\n' +
                        '\t\tc-7.492-8.068-9.496-19.798-5.101-29.899C40.042,6.525,50.005,0,61.014,0h362.188c15.255,0,27.68,12.413,27.68,27.68v69.363\n' +
                        '\t\tc0,15.259-12.419,27.677-27.68,27.677C407.94,124.72,395.527,112.308,395.527,97.043z"/>\n' +
                        '</g>\n' +
                        '</svg>',
                    tooltip: 'Insert LaTeX equation',
                    click: function() {
                        console.log('Button clicked');
                        self.show();  // Show Modal
                    }
                });

                var $button = button.render();
                return $button;
            });

            this.initialize = function() {
                console.log('Initializing modal'); // Debugging

                // Create the modal for the LaTeX input
                this.$dialog = $('<div class="modal fade" id="latexModal" tabindex="-1" role="dialog" aria-labelledby="latexModalLabel" aria-hidden="true">' +
                    '<div class="modal-dialog" role="document">' +
                    '<div class="modal-content">' +
                    '<div class="modal-header">' +
                    '<h5 class="modal-title" id="latexModalLabel">Enter LaTeX equation</h5>' +
                    '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
                    '<span aria-hidden="true">&times;</span>' +
                    '</button>' +
                    '</div>' +
                    '<div class="modal-body">' +
                    '<textarea id="latexInput" class="form-control" rows="4" placeholder="Enter your LaTeX equation"></textarea>' +
                    '<hr>' +
                    '<h6>Vorschau:</h6>' +
                    '<div id="latexPreview" style="border: 1px solid #ddd; padding: 10px; background-color: #f9f9f9;"></div>' +
                    '</div>' +
                    '<div class="modal-footer">' +
                    '<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>' +
                    '<button type="button" class="btn btn-primary" id="insertLatexBtn">Insert</button>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
                );

                // Attach the modal to the body
                $('body').append(this.$dialog);

                // Modal is not displayed by default
                this.$dialog.modal({ show: false });

                // Event handler for closing the modal and resetting the input fields
                this.$dialog.on('hidden.bs.modal', function() {
                    $('#latexInput').val('');
                    $('#latexPreview').html('');
                });


                // Event handler for inserting LaTeX
                this.$dialog.find('#insertLatexBtn').on('click', function () {
                    var latex = $('#latexInput').val().trim();

                    if (latex) {
                        // Check whether the equation already exists
                        if ($('#summernote .latex-node').length > 0) {
                            alert('Equation has already been inserted.');
                            return; // Prevents re-insertion
                        }

                        // Formatting LaTeX code
                        var equation = '\\(' + latex + '\\)'; // LaTeX only without <br>

                        console.log('LaTeX equation:', equation); // Debugging

                        // Access the Summernote editor
                        var editor = $('#summernote');

                        const range = $.summernote.range;  // range utility
                        editor.summernote('restoreRange');
                        let rng = editor.summernote('getLastRange');

                        if (rng) {
                            // Create a `span` element for the equation
                            var latexNode = document.createElement('span');
                            latexNode.className = 'latex-node';

                            // Set the LaTeX expression directly in `innerHTML`, without MathJax script
                            latexNode.innerHTML = equation;

                            // Insert the LaTeX expression at the cursor position
                            rng.insertNode(latexNode);

                            // Initialise MathJax, but without adding <script> tags
                            MathJax.Hub.Queue(["Typeset", MathJax.Hub]);

                            var previews = document.querySelectorAll('.MathJax_Preview');
                            previews.forEach(function(preview) {
                                // Change the class name of MathJax_Preview to a new name
                                preview.classList.replace('MathJax_Preview', 'MathJax_Exp');
                            });

                            // Remove the MathJax <script> tag, if present
                            $(latexNode).children().last().remove();

                            console.log('LaTeX successfully inserted.');
                        } else {
                            console.warn('No valid range found!');
                        }

                        // Close the modal
                        self.$dialog.modal('hide');
                    } else {
                        alert('Please enter a LaTeX equation.');
                    }
                });


                // Update event handler for entering LaTeX and preview
               this.$dialog.find('#latexInput').on('input', function() {
                    var latex = $('#latexInput').val().trim();
                    if (latex) {
                        var equation = '\\(' + latex + '\\)';
                        $('#latexPreview').html(equation);
                        MathJax.Hub.Queue(["Typeset", MathJax.Hub]); // Update preview
                        var previews = document.querySelectorAll('.MathJax_Preview');
                        /*previews.forEach(function(preview) {
                            // Change the class name of MathJax_Preview to a new name
                            preview.classList.replace('MathJax_Preview', 'MathJax_Preview');
                        });*/
                    } else {
                        $('#latexPreview').html('');
                    }
                });
            };

            // Function for displaying the modal
            this.show = function() {
                console.log('Modal is displayedt'); // Debugging
                this.$dialog.modal('show');
            };

            // Function for destroying the modal
            this.destroy = function() {
                this.$dialog.remove();
            };
        }
    });
}));
