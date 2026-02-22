import './SkillBadge.css';

type BadgeVariant = 'skill' | 'domain' | 'looking' | 'more' | 'default';

interface SkillBadgeProps {
    label: string;
    variant?: BadgeVariant;
    onRemove?: () => void;
}

const SkillBadge = ({ label, variant = 'default', onRemove }: SkillBadgeProps) => {
    return (
        <span className={`skill-badge skill-badge--${variant}`}>
            {label}
            {onRemove && (
                <button className="badge-remove" onClick={onRemove} aria-label={`Remove ${label}`}>
                    ×
                </button>
            )}
        </span>
    );
};

export default SkillBadge;
