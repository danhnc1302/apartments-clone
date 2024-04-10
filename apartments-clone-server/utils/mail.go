package utils

import (
	"os"
	"fmt"
	"github.com/mailjet/mailjet-apiv3-go"
)

func SendMail(userEmail string, subject string, html string) (bool, error) {
	publicKey := os.Getenv("EMAIL_API_KEY")
	privateKey := os.Getenv("EMAIL_SECRET_KEY")	

	mailjetClient := mailjet.NewMailjetClient(publicKey, privateKey)
	messagesInfo := []mailjet.InfoMessagesV31{
		{
			From: &mailjet.RecipientV31{
				Email: "danhnc1302vde@gmail.com",
			},
			To: &mailjet.RecipientsV31{
				mailjet.RecipientV31{
					Email: userEmail,
				},
			},
			Subject:  subject,
			HTMLPart: html,
		},
	}
	messages := mailjet.MessagesV31{Info: messagesInfo}
	fmt.Println(mailjetClient)
	fmt.Println(messagesInfo)

	_, err := mailjetClient.SendMailV31(&messages)
	
	if err != nil {
		return false, err
	}

	return true, nil
}