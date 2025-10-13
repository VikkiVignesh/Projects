package com.Vikki.ProjectManagementSystem.Controller;

import com.Vikki.ProjectManagementSystem.Model.PlanType;
import com.Vikki.ProjectManagementSystem.Model.Users;
import com.Vikki.ProjectManagementSystem.Response.PaymentLinkResponse;
import com.Vikki.ProjectManagementSystem.Services.UserService;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Value("${razorpay.api.key}")
    private  String apiKey;

    @Value(("${razorpay.api.secret}"))
    private  String apiSecret;

    @Autowired
    private UserService userService;

    public ResponseEntity<PaymentLinkResponse>createPaymentLink(
            @PathVariable PlanType planType,
            @RequestHeader("Authorization") String jwt
            ) throws Exception
    {
        Users user=userService.findUserProfileByJwt(jwt);
        int amount=799*100;

        if(planType.equals(PlanType.ANNUALLY))
        {
            amount=amount*12;
            amount=(int)(amount*0.7);
        }

        try
        {
            RazorpayClient razorpayClient=new RazorpayClient(apiKey,apiSecret);

            JSONObject paymentLinkResponse=new JSONObject();
            paymentLinkResponse.put("amount",amount);
            paymentLinkResponse.put("currency","INR");

            JSONObject customer=new JSONObject();
            customer.put("name",user.getName());
            customer.put("email",user.getEmail());

            paymentLinkResponse.put("customer",customer);

            JSONObject notify=new JSONObject();
            notify.put("email",true);
            paymentLinkResponse.put("notify",notify);


            PaymentLink paymentLink=razorpayClient.paymentLink.create(paymentLinkResponse);

            paymentLinkResponse.put("callback_url","http://localhost:5173/upgrade_plan/success?planType"+planType);

            String paymentLinkId=paymentLink.get("id");
            String paymentLinkUrl=paymentLink.get("short_url");


            PaymentLinkResponse res=new PaymentLinkResponse();
            res.setPayment_link_id(paymentLinkId);
            res.setPayment_link_url(paymentLinkUrl);

            return  new ResponseEntity<>(res, HttpStatus.OK);
        }
        catch (Exception e)
        {
            throw new Exception("Failed to Generate Payment Link");
        }

    }

}
