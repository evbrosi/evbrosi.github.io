$(function () {
    $("#tipHit").click(function (ev) {
        var billAmount = Number($("#billAmount").val());
        var partyCount = Number($("#partyCount").val());
        var individualBill = billAmount/partyCount
        var tipConsidering = Number($("#tipChoice").val());
        var tipAmount= (billAmount *tipConsidering/100);
        var individualTipAmount = (tipAmount/partyCount);
        //partyCount.toFixed(2);//
        var individualBill = (individualBill+individualTipAmount);
        var totalBill= (billAmount + tipAmount)

        console.log(billAmount+partyCount+tipAmount);
        if (isNaN(billAmount)) {
            alert("Please enter a valid number")
        } else {
            
            }

        $("#printOutTip").html(individualTipAmount.toFixed(2));
        $("#printItOut").html(individualBill.toFixed(2));
        if (partyCount > 1){
        $("#printOutPartyTip").html(tipAmount.toFixed(2));
        $("#totalBill").html(totalBill.toFixed(2));
        } else {}

        console.log(individualBill)
        if(partyCount > 1){
            $(".card").css("height", "430px");
        }else {
            $(".group-party").css("color", "#000000")
        }
        });
    });

$("#removal").click(function() {
    location.reload();
    });
