<?php

namespace Application\Sonata\UserBundle\Component\Authentication\Handler;

use Symfony\Component\Security\Http\Authentication\AuthenticationSuccessHandlerInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\SecurityContext;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Routing\Router;

class LoginSuccessHandler implements AuthenticationSuccessHandlerInterface
{
	private $router;
        public function __construct(Router $router)
        {
            $this->router = $router;
        }
	public function onAuthenticationSuccess(Request $request, TokenInterface $token)
	{
            $referer=$request->get('referer');
            if ($referer){
                $response = new RedirectResponse($referer);
            }else{
                $response= new RedirectResponse($this->router->generate('fcbn_dashboard_homepage'));
            }
            return $response;
	}
	
}
