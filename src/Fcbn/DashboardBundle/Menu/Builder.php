<?php
namespace Fcbn\DashboardBundle\Menu;

use Knp\Menu\FactoryInterface;
use Symfony\Component\DependencyInjection\ContainerAware;

class Builder extends ContainerAware
{
    public function mainMenu(FactoryInterface $factory, array $options)
    {
        $menu = $factory->createItem('root');
        $menu->setCurrentUri($this->container->get('request')->getRequestUri());
        if (isset($options['context']) && $options['context'] == 'navbar') {
            $menu->setChildrenAttribute('class', 'nav navbar-nav');
        } else {
            $menu->setChildrenAttribute('class', 'nav nav-pills nav-stacked');
        }

        if ($this->container->get('security.context')->isGranted('ROLE_MENU_ADMIN')) {
            $menu->addChild('Admin',  array('route' => 'sonata_admin_dashboard'));
        }

//        $menu->addChild('SIFlore', array('route'=> 'si_flore_homepage'));
        $menu->addChild('Flore (SIFlore)', array('route'=> 'new_si_flore_homepage'));
        $menu->addChild('Végétations (SIVeg)', array('route'=> 'new_si_veg_homepage'));
        return $menu;
    }
}
?>
