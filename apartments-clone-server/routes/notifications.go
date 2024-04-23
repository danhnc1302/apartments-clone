package routes

import (
	"apartments-clone-server/utils"
	"github.com/kataras/iris/v12"
	"os"
)

func TestMessageNotification(ctx iris.Context) {
	dns := os.Getenv("DB_CONNECTION_STRING")
	pushToken := os.Getenv("EXPONENT_PUSH_TOKEN")
	data := map[string]string{
		"url": "exp://" + dns + ":8081/--/messageproperty/19",
	}

	err := utils.SendNotification(
		"ExponentPushToken[" + pushToken +"]",
		"Push Title", "Push body is this message", data)
	if err != nil {
		utils.CreateInternalServerError(ctx)
		return
	}

	ctx.JSON(iris.Map{
		"sent": true,
	})
}