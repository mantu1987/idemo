 $(document).ready(function () {

     $('#btnUploadFile').on('click', function () {

         var data = new FormData();

         var files = $("input[type='file']").get(0).files;

         // Add the uploaded image content to the form data collection
         if (files.length > 0) {
             data.append("UploadedImage", files[0]);
         }

         // Make Ajax request with the contentType = false, and procesDate = false
         var ajaxRequest = $.ajax({
             type: "POST",
             url: "http://localhost:9000/upload",
             contentType: false,
             processData: false,
             xhr: function () {
                 var myXhr = $.ajaxSettings.xhr();
                 if (myXhr.upload) {
                     myXhr.upload.addEventListener('progress', function (e) {
                         if (e.lengthComputable) {
                             var max = e.total;
                             var current = e.loaded;

                             var Percentage = (current * 100) / max;
                             console.log(Percentage);


                             if (Percentage >= 100) {
                                 // process completed
                             }
                         }
                     }, false);
                 }
                 return myXhr;
             },
             data: data
         });

         ajaxRequest.done(function (responseData, textStatus) {
             if (textStatus == 'success') {
                 if (responseData != null) {
                     if (responseData.Key) {
                         alert(responseData.Value);
                         $("#fileUpload").val('');
                     } else {
                         alert(responseData.Value);
                     }
                 }
             } else {
                 alert(responseData.Value);
             }
         });
     });
 });
