<?php
namespace Application\Sonata\UserBundle\DependencyInjection\Compiler;

use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;
use Symfony\Component\DependencyInjection\ContainerBuilder;

class OverrideServiceCompilerPass implements CompilerPassInterface
{
    public function process(ContainerBuilder $container)
    {
        $definition = $container->getDefinition('sonata.user.editable_role_builder');
        $definition->setClass('Application\Sonata\UserBundle\Security\EditableRolesBuilder');
        $definition = $container->getDefinition('sonata.user.form.type.security_roles');
        $definition->setClass('Application\Sonata\UserBundle\Form\Type\SecurityRolesType');
    }
}
