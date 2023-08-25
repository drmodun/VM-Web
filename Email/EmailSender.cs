
// using SendGrid's C# Library
// https://github.com/sendgrid/sendgrid-csharp
using SendGrid;
using SendGrid.Helpers.Mail;

public static class EmailSender
{
    public static string ApiKey;
    public static async Task<bool> SendEmail(string emailAddress, string emailSubject, string emailHtmlContent)
    {
        try
        {
            if (ApiKey == null)
            {
                Console.WriteLine("pain");
            }
            var client = new SendGridClient(ApiKey);
            var from = new EmailAddress("vm.racunala.test@gmail.com", "Jan Modun");
            var subject = emailSubject;
            var to = new EmailAddress(emailAddress);
            var plainTextContent = "VM-racunala email";
            var htmlContent = emailHtmlContent;
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg);
            Console.WriteLine(response.StatusCode
                .ToString());
            return response.IsSuccessStatusCode;
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return false;
        }
    }
}