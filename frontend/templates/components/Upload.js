import React from 'react';
import jQuery from 'jquery';
import '../styles/Upload.scss';

const $ = jQuery;

export default class Upload extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };

        this.acceptedFileTypes = ['jpg', 'gif', 'jpeg', 'bmp','png'];

        this.bindToButtons = this.bindToButtons.bind(this);
    }

    componentDidMount() {
        console.log('Binding');
        this.bindToButtons();
    }

    bindToButtons(){
        const main = this;
        (function( $ ) {

            $.fn.uploader = function( options ) {
                let settings = $.extend({
                    MessageAreaText: "Ни один файл не выбран.",
                    MessageAreaTextWithFiles: "Список файлов:",
                    DefaultErrorMessage: "Невозможно открыть этот файл.",
                    BadTypeErrorMessage: "Тип файла недоступен."
                }, options );

                let uploadId = 1;
                //update the messaging file-uploader__submit-button
                $('.file-uploader__message-area p').text(options.MessageAreaText || settings.MessageAreaText);

                //create and add the file list and the hidden input list
                let fileList = $('<ul class="file-list"></ul>');
                let hiddenInputs = $('<div class="hidden-inputs hidden"></div>');
                $('.file-uploader__message-area').after(fileList);
                $('.file-list').after(hiddenInputs);

                //when choosing a file, add the name to the list and copy the file input into the hidden inputs
                $('.file-chooser__input').on('change', function(){
                    let file = $('.file-chooser__input').val();
                    let fileName = (file.match(/([^\\\/]+)$/)[0]);

                    //clear any error condition
                    $('.file-chooser').removeClass('error');
                    $('.error-message').remove();

                    //validate the file
                    let check = checkFile(fileName);
                    if(check === "valid") {

                        // move the 'real' one to hidden list
                        $('.hidden-inputs').append($('.file-chooser__input'));

                        //insert a clone after the hiddens (copy the event handlers too)
                        $('.file-chooser').append($('.file-chooser__input').clone({ withDataAndEvents: true}));

                        //add the name and a remove button to the file-list
                        $('.file-list').append('<li style="display: none;"><span class="file-list__name">' + fileName + '</span><button class="removal-button" data-uploadid="'+ uploadId +'"></button></li>');
                        $('.file-list').find("li:last").show(800);

                        //removal button handler
                        $('.removal-button').on('click', function(e){
                            e.preventDefault();
                            const _this = e.target;

                            //remove the corresponding hidden input
                            $('.hidden-inputs input[data-uploadid="'+ $(_this).data('uploadid') +'"]').remove();

                            //remove the name from file-list that corresponds to the button clicked
                            $(_this).parent().hide("puff").delay(10).queue(function(){$(_this).remove();});

                            //if the list is now empty, change the text back
                            if($('.file-list li').length === 0) {
                                $('.file-uploader__message-area').text(options.MessageAreaText || settings.MessageAreaText);
                            }
                        });

                        //so the event handler works on the new "real" one
                        $('.hidden-inputs .file-chooser__input').removeClass('file-chooser__input').attr('data-uploadId', uploadId);

                        //update the message area
                        $('.file-uploader__message-area').text(options.MessageAreaTextWithFiles || settings.MessageAreaTextWithFiles);

                        uploadId++;

                    } else {
                        //indicate that the file is not ok
                        $('.file-chooser').addClass("error");
                        let errorText = options.DefaultErrorMessage || settings.DefaultErrorMessage;

                        if(check === "badFileName") {
                            errorText = options.BadTypeErrorMessage || settings.BadTypeErrorMessage;
                        }

                        $('.file-chooser__input').after('<p class="error-message">'+ errorText +'</p>');
                    }
                });

                let checkFile = function(fileName) {
                    let accepted = "invalid";
                    let acceptedFileTypes = main.acceptedFileTypes || settings.acceptedFileTypes;

                    for ( let i = 0; i < acceptedFileTypes.length; i++ ) {
                        let regex = new RegExp("\\." + acceptedFileTypes[i] + "$", "i");

                        if ( regex.test(fileName) ) {
                            accepted = "valid";
                            break;
                        } else {
                            accepted = "badFileName";
                        }
                    }

                    return accepted;
                };
            };
        }( jQuery ));

        //init
        $(document).ready(function(){
            console.log('It binds');
            $('.fileUploader').uploader({
                MessageAreaText: "Файл не выбран. Пожалуйста, выберите файл."
            });
        });
    }

    render() {
        const upload_form =
            <form method="POST" className="file-uploader" action="/upload" encType="multipart/form-data">
                <div className="file-uploader__message-area">
                    <p>Выберите файл(-ы) для загрузки</p>
                </div>
                <div className="file-chooser">
                    <input className="file-chooser__input" type="file" name='file' multiple accept="image/*,image/jpeg" />
                </div>
                <input className="file-uploader__submit-button" type="submit" value="Загрузить" />
            </form>;

        return(upload_form);
    }
}
